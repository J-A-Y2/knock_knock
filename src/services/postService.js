import { PostModel } from '../db/models/postModel.js';
import { UserModel } from '../db/models/UserModel.js';
import { db } from '../db/index.js';
import { InternalServerError, NotFoundError, UnauthorizedError } from '../middlewares/errorMiddleware.js';

const postService = {
    createPost: async ({ userId, post }) => {
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
    getAllPosts: async ({ page, perPage }) => {
        try {
            const offset = (page - 1) * perPage;
            const limit = perPage;
            const { total, posts } = await PostModel.getAllPosts({ offset, limit });

            return { message: '게시글 전체 조회를 성공했습니다.', total, posts };
        } catch (error) {
            if (error) {
                throw new InternalServerError('게시물 전체 조회를 실패했습니다.');
            }
        }
    },
    getPost: async postId => {
        try {
            const post = await PostModel.getPostById(postId);

            if (!post) {
                throw new NotFoundError('해당 id의 게시글을 찾을 수 없습니다.');
            }
            return { message: '게시글 조회를 성공했습니다.', post };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('게시물 조회를 실패했습니다.');
            }
        }
    },
    setPost: async ({ userId, postId, toUpdate }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            let post = await PostModel.getPostById(postId);

            if (!post) {
                throw new NotFoundError('해당 id의 게시글을 찾을 수 없습니다.');
            }

            if (post.userId !== userId) {
                throw new UnauthorizedError('수정 권한이 없습니다.');
            }

            const fieldsToUpdate = {
                postTitle: 'postTitle',
                postContent: 'postContent',
                postType: 'postType',
                people: 'people',
                place: 'place',
                meetingTime: 'meetingTime',
            };
            for (const [field, fieldToUpdate] of Object.entries(fieldsToUpdate)) {
                if (toUpdate[field]) {
                    const newValue = toUpdate[field];
                    post = await PostModel.update({ postId, fieldToUpdate, newValue });
                }
            }
            await transaction.commit();
            return { message: '게시글 수정을 성공했습니다.' };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('게시글 수정을 실패했습니다.');
            }
        }
    },
};

export { postService };
