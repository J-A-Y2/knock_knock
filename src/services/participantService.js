import { PostModel } from '../db/models/postModel.js';
import { ParticipantModel } from '../db/models/ParticipantModel.js';
import { ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from '../middlewares/errorMiddleware.js';

const participantService = {
    participatePost: async ({ userId, postId }) => {
        try {
            const post = await PostModel.getPostById(postId);
            if (!post) {
                throw new NotFoundError('해당 Id의 게시글을 찾을 수 없습니다.');
            }

            if (post.user_id === userId) {
                throw new ConflictError('게시글의 작성자는 참가 신청을 할 수 없습니다.');
            }

            const count = await ParticipantModel.countParticipationByUserId({ userId, postId });
            if (count) {
                const participation = await ParticipantModel.getParticipationIdById({ userId, postId });
                const participantId = participation.participant_id;
                const canceled = participation.canceled;
                const canceledValue = participation.canceled ? 0 : 1;

                if (!canceled) {
                    throw new ConflictError('이미 참가 신청을 보낸 모임입니다.');
                } else {
                    await ParticipantModel.participatePut({ participantId, canceledValue });
                }
            } else {
                await ParticipantModel.participatePost({ userId, postId });
            }

            return { message: '모임 참가 신청에 성공했습니다.' };
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
            const participation = await ParticipantModel.getParticipationIdById({ userId, postId });
            if (!participation) {
                throw new NotFoundError('해당 id의 참가 신청 정보를 찾을 수 없습니다.');
            }
            const participantId = participation.participant_id;
            const canceledValue = participation.canceled ? 0 : 1;

            await ParticipantModel.participatePut({ participantId, canceledValue });
            return { message: '신청 취소를 성공했습니다.' };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('신청 취소에 실패했습니다.');
            }
        }
    },
    getParticipants: async ({ userId, postId }) => {
        try {
            const post = await PostModel.getPostById(postId);
            if (!post) {
                throw new NotFoundError('해당 Id의 게시글을 찾을 수 없습니다.');
            }
            if (post.user_id !== userId) {
                //conflictError인지 UnauthorizedError인지 고민..
                throw new UnauthorizedError('참가자 리스트 조회 권한이 없습니다.');
            }

            const { total, participants } = await ParticipantModel.getParticipants(postId);
            return { message: '참가자 리스트 조회를 성공했습니다.', total, participants };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('참가자 리스트 불러오기에 실패했습니다.');
            }
        }
    },
};
export { participantService };
