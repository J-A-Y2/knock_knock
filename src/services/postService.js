import { PostModel } from '../db/models/postModel.js';
import { UserModel } from '../db/models/UserModel.js';
import { db } from '../db/index.js';
import { InternalServerError, UnauthorizedError } from '../middlewares/errorMiddleware.js';

const postService = {
    createPost: async function ({ userId, post }) {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();

            const user = await UserModel.findById(userId);

            if (!user) {
                throw new UnauthorizedError('잘못된 토큰입니다.');
            }

            await PostModel.create({ newPost: { userId, ...post } });

            await transaction.commit();

            return { message: '게시물 작성을 성공했습니다.' };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }

            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('게시물 작성을 실패했습니다.');
            }
        }
    },
};

export { postService };
