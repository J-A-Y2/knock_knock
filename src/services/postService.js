import { PostModel } from '../db/models/postModel.js';
import { UserModel } from '../db/models/UserModel.js';
import { ParticipantModel } from '../db/models/ParticipantModel.js';
import { db } from '../db/index.js';
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../middlewares/errorMiddleware.js';

const postService = {
    createPost: async ({ userId, newPost }) => {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new UnauthorizedError('잘못된 토큰입니다.');
            }
            const gender = user.gender;
            if (gender === '여') {
                newPost.recruited_f = 1;
            } else {
                newPost.recruited_m = 1;
            }
            await PostModel.create({ newPost: { user_id: userId, ...newPost } });

            return { message: '게시물 작성을 성공했습니다.' };
        } catch (error) {
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

            if (post.user_id !== userId) {
                throw new UnauthorizedError('수정 권한이 없습니다.');
            }

            if (toUpdate.total_m) {
                if (post.recruited_m > toUpdate.total_m) {
                    throw new BadRequestError('현재 모집된 인원보다 적게 수정할 수 없습니다.');
                }
            }

            const fieldsToUpdate = {
                post_title: 'post_title',
                post_content: 'post_content',
                post_type: 'post_type',
                place: 'place',
                total_m: 'total_m',
                total_f: 'total_f',
                meeting_time: 'meeting_time',
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
            } else if (error instanceof BadRequestError) {
                throw error;
            } else {
                throw new InternalServerError('게시글 수정을 실패했습니다.');
            }
        }
    },
    participatePost: async ({ userId, postId }) => {
        try {
            // userId가 게시글 작성자의 id와 다른지 확인
            // 게시글 작성할 때 작성자의 성별 -> recuitedF/M = 1
            const post = await PostModel.getPostById(postId);
            if (!post) {
                throw new NotFoundError('해당 Id의 게시글을 찾을 수 없습니다.');
            }
            await ParticipantModel.participatePost({ userId, postId });

            return { message: '모임 참가에 성공했습니다.' };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('모임 참가에 실패했습니다.');
            }
        }
    },
};

export { postService };
