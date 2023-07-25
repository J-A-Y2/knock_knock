import { PostModel } from '../db/models/postModel.js';
import { ParticipantModel } from '../db/models/ParticipantModel.js';
import { ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from '../middlewares/errorMiddleware.js';
import { db } from '../db/index.js';
import { UserModel } from '../db/models/UserModel.js';
import { throwNotFoundError } from '../utils/commonFunctions.js';
import {
    checkParticipation,
    getHobbyAndIdeal,
    updateRecruitedValue,
    getParticipantsList,
} from '../utils/participantFunctions.js';

const participantService = {
    participatePost: async ({ userId, postId }) => {
        try {
            const post = await PostModel.getPostById(postId);
            throwNotFoundError(post, '게시글');

            if (post.user_id === userId) {
                throw new ConflictError('게시글의 작성자는 참가 신청을 할 수 없습니다.');
            }

            let participationFlag;
            const participation = await ParticipantModel.getParticipationByUserId({ userId, postId });
            if (participation) {
                const { participant_id, canceled, status } = participation;
                if (!canceled) {
                    throw new ConflictError('이미 참가 신청을 보낸 모임입니다.');
                }

                if (status !== 'pending') {
                    throw new ConflictError('이미 수락되거나 거절된 모임입니다.');
                }
                await ParticipantModel.update({ participantId: participant_id, updateField: 'canceled', newValue: 0 });
                participationFlag = canceled;
            } else {
                await ParticipantModel.participatePost({ userId, postId });

                participationFlag = 'true';
            }
            console.log('b', participationFlag);
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
            const { participant_id, canceled, status } = participation;

            if (canceled) {
                throw new ConflictError('이미 취소된 신청 정보입니다.');
            }

            if (status !== 'pending') {
                throw new ConflictError('이미 수락되거나 거절된 모임입니다.');
            }

            await ParticipantModel.update({ participantId: participant_id, updateField: 'canceled', newValue: 1 });

            return { message: '신청 취소를 성공했습니다.', canceled };
        } catch (error) {
            if (error instanceof NotFoundError || error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('신청 취소에 실패했습니다.');
            }
        }
    },
    getParticipants: async ({ userId, postId, cursor, limit }) => {
        try {
            const post = await PostModel.getPostById(postId);

            const user = await UserModel.findById(userId);
            throwNotFoundError(post, '게시글');
            throwNotFoundError(user, '유저');

            if (post.user_id !== userId) {
                throw new ConflictError('참가자 리스트 조회 권한이 없습니다.');
            }
            const participants = await ParticipantModel.getParticipants(postId);

            const { hobby, ideal } = await getHobbyAndIdeal(user);

            const participantsList = await getParticipantsList(participants, ideal);

            // matchingCount를 기준으로 내림차순으로 정렬
            participantsList.sort((a, b) => b.matchingCount - a.matchingCount);

            // 커서를 이용하여 페이지네이션을 위한 시작 인덱스 계산
            let startIndex = 0;
            if (cursor) {
                const participantIndex = participantsList.findIndex(participant => participant.participationId == cursor);
                startIndex = participantIndex !== -1 ? participantIndex + 1 : 0;
            }

            // limit 적용
            const paginatedList = participantsList.slice(startIndex, startIndex + limit);

            // 다음 페이지를 위한 커서를 사용할 맨 마지막 id 추출
            let nextCursor = null;
            if (paginatedList.length > 0) {
                nextCursor = paginatedList[paginatedList.length - 1].participationId;
            }

            return {
                message: '참가자 리스트 조회를 성공했습니다.',
                ideal,
                isFulled: post.is_completed,
                participantsList: paginatedList,
                nextCursor,
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

            const { total_m, total_f, recruited_f, recruited_m, post_id } = Post;
            const { gender } = User;

            const { fieldToUpdate, newValue } = await updateRecruitedValue(gender, total_m, total_f, recruited_f, recruited_m);

            await ParticipantModel.update({ transaction, participantId, updateField: 'status', newValue: 'accepted' });
            await PostModel.update({ transaction, postId: post_id, fieldToUpdate, newValue });

            await transaction.commit();

            return {
                message: '신청 수락을 성공하였습니다.',
                totalM: Post.total_m,
                totalF: Post.total_f,
                recruitedF: fieldToUpdate === 'recruited_f' ? newValue : recruited_f,
                recruitedM: fieldToUpdate === 'recruited_m' ? newValue : recruited_m,
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

            if (post.user_id !== userId) {
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
