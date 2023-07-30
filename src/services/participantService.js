import { ParticipantModel } from '../db/models/ParticipantModel.js';
import { ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from '../middlewares/errorMiddleware.js';
import { db } from '../db/index.js';
import { PostModel } from '../db/models/PostModel.js';
import { UserModel } from '../db/models/UserModel.js';
import { throwNotFoundError } from '../utils/commonFunctions.js';
import {
    checkParticipation,
    getIdealAndPersonality,
    updateRecruitedValue,
    getParticipantsList,
    getMatchingCount,
} from '../utils/participantFunctions.js';

const participantService = {
    participatePost: async ({ userId, postId }) => {
        try {
            const post = await PostModel.getPostById(postId);
            const writer = await UserModel.findById(post.userId);
            const participant = await UserModel.findById(userId);
            throwNotFoundError(post, '게시글');

            if (post.userId === userId) {
                throw new ConflictError('게시글의 작성자는 참가 신청을 할 수 없습니다.');
            }

            const matchingCount = await getMatchingCount(writer, participant);

            let participationFlag;
            const participation = await ParticipantModel.getParticipationByUserId({ userId, postId });
            if (participation) {
                const { participantId, canceled, status } = participation;
                if (!canceled) {
                    throw new ConflictError('이미 참가 신청을 보낸 모임입니다.');
                }

                if (status !== 'pending') {
                    throw new ConflictError('이미 수락되거나 거절된 모임입니다.');
                }
                await ParticipantModel.update({ participantId, updateField: 'canceled', newValue: 0 });
                participationFlag = canceled;
            } else {
                await ParticipantModel.participatePost({ userId, postId, matchingCount });

                participationFlag = true;
            }
            return { message: '모임 참가 신청에 성공했습니다.', participationFlag };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('모임 참가 신청에 실패했습니다.');
            }
        }
    },
    participateCancel: async ({ userId, postId }) => {
        try {
            const participation = await ParticipantModel.getParticipationByUserId({ userId, postId });

            throwNotFoundError(participation, '참가 신청 정보');
            const { participantId, canceled, status } = participation;

            if (canceled) {
                throw new ConflictError('이미 취소된 신청 정보입니다.');
            }

            if (status !== 'pending') {
                throw new ConflictError('이미 수락되거나 거절된 모임입니다.');
            }

            await ParticipantModel.update({ participantId, updateField: 'canceled', newValue: 1 });

            return { message: '신청 취소를 성공했습니다.', canceled };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('신청 취소에 실패했습니다.');
            }
        }
    },
    checkParticipation: async ({ userId, postId }) => {
        try {
            const participation = await ParticipantModel.getParticipationByUserId({ userId, postId });
            throwNotFoundError(participation, '참가 신청 정보');
            const { participantId, status, canceled } = participation;
            return { message: '신청 여부 조회에 성공했습니다.', participantId, status, canceled };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('신청 여부 조회에 실패했습니다.');
            }
        }
    },
    getParticipants: async ({ userId, postId, cursor, limit }) => {
        try {
            const post = await PostModel.getPostById(postId);

            const user = await UserModel.findById(userId);
            throwNotFoundError(post, '게시글');
            throwNotFoundError(user, '유저');

            if (post.userId !== userId) {
                throw new ConflictError('참가자 리스트 조회 권한이 없습니다.');
            }

            const participants = await ParticipantModel.getParticipants(postId);

            const { ideal } = await getIdealAndPersonality(user);

            for (const participant of participants) {
                const { personality } = await getIdealAndPersonality(participant.User);
                const matchingCount = ideal.filter(tag => personality.includes(tag)).length;
                await ParticipantModel.update({
                    participantId: participant.participantId,
                    updateField: 'matchingCount',
                    newValue: matchingCount,
                });
            }
            let updatedParticipants = [];

            if (cursor == 0) {
                updatedParticipants = await ParticipantModel.getUpdatedParticipants({ postId, limit });
            } else if (cursor == -1) {
                updatedParticipants = '전체 신청자 조회가 끝났습니다';
            } else {
                updatedParticipants = await ParticipantModel.getUpdatedParticipantsByCursor({ postId, cursor, limit });
            }

            return {
                message: '참가자 리스트 조회를 성공했습니다.',
                ideal,
                isFulled: post.isCompleted,
                participantsList: updatedParticipants,
            };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('참가자 리스트 불러오기에 실패했습니다.');
            }
        }
    },
    allow: async ({ participantId, userId }) => {
        const transaction = await db.sequelize.transaction({ autocommit: false }); // 트랜잭션 생성
        try {
            const participation = await ParticipantModel.getParticipationById(participantId);

            throwNotFoundError(participation, '참가 신청 정보');

            const { Post, User } = await checkParticipation('수락', participation, userId);

            const { totalM, totalF, recruitedF, recruitedM, postId } = Post;
            const { gender } = User;

            const { fieldToUpdate, newValue } = await updateRecruitedValue(gender, totalM, totalF, recruitedF, recruitedM);

            await ParticipantModel.update({ transaction, participantId, updateField: 'status', newValue: 'accepted' });
            await PostModel.update({ transaction, postId, fieldToUpdate, newValue });

            await transaction.commit();

            return {
                message: '신청 수락을 성공하였습니다.',
                totalM: totalM,
                totalF: totalF,
                recruitedF: fieldToUpdate === 'recruitedF' ? newValue : recruitedF,
                recruitedM: fieldToUpdate === 'recruitedM' ? newValue : recruitedM,
            };
        } catch (error) {
            await transaction.rollback();
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('신청 수락에 실패했습니다.');
            }
        }
    },
    deny: async ({ participantId, userId }) => {
        try {
            const participation = await ParticipantModel.getParticipationById(participantId);

            throwNotFoundError(participation, '참가 신청 정보');

            await checkParticipation('거절', participation, userId);

            await ParticipantModel.update({ participantId, updateField: 'status', newValue: 'rejected' });

            return { message: '신청 거절을 성공하였습니다.' };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('신청 거절을 실패했습니다.');
            }
        }
    },
    getAcceptedUsers: async ({ userId, postId }) => {
        try {
            const post = await PostModel.getPostById(postId);
            throwNotFoundError(post, '게시글');

            if (post.userId !== userId) {
                throw new ConflictError('리스트 조회 권한이 없습니다.');
            }

            const acceptedUsers = await ParticipantModel.getAcceptedUsers(postId);

            return { message: '수락한 유저 리스트 조회를 성공했습니다.', acceptedUsers };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('수락한 유저 리스트 불러오기에 실패했습니다.');
            }
        }
    },
};
export { participantService };
