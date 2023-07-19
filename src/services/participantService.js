import { PostModel } from '../db/models/postModel.js';
import { UserModel } from '../db/models/UserModel.js';
import { ParticipantModel } from '../db/models/ParticipantModel.js';
import {
    BadRequestError,
    ConflictError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
} from '../middlewares/errorMiddleware.js';

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

            const count = await ParticipantModel.getParticipationByUserId({ userId, postId });
            if (count) {
                throw new ConflictError('이미 참가 신청을 보낸 모임입니다.');
            }
            await ParticipantModel.participatePost({ userId, postId });

            return { message: '모임 참가에 성공했습니다.' };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('모임 참가에 실패했습니다.');
            }
        }
    },
};
export { participantService };
