import { db } from '../db/index.js';
import { CommentModel } from '../db/models/CommentModel.js';
import { UserModel } from '../db/models/UserModel.js';
import { UnauthorizedError, NotFoundError, InternalServerError } from '../middlewares/errorMiddleware.js';

const commentService = {
    createComment: async ({ userId, postId, content }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();

            const user = await UserModel.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            await CommentModel.create({ userId, postId, content });

            await transaction.commit();

            return {
                message: '댓글 추가하기에 성공했습니다.',
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('댓글 추가하기에 실패했습니다.');
            }
        }
    },

    updateComment: async ({ userId, postId, commentId, content }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();

            const user = await UserModel.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const comment = await CommentModel.findById({ commentId });

            if (!comment) {
                throw new NotFoundError('요청한 댓글의 정보를 찾을 수 없습니다.');
            }

            await CommentModel.update({ postId, commentId, content });

            await transaction.commit();

            return {
                message: '댓글 수정하기에 성공하셨습니다.',
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }

            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('댓글 수정하기에 실패했습니다.');
            }
        }
    },

    deleteComment: async ({ userId, commentId }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();

            const user = await UserModel.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const comment = await CommentModel.findById({ commentId });

            if (!comment) {
                throw new NotFoundError('요청한 댓글의 정보를 찾을 수 없습니다.');
            }

            await CommentModel.delete({ commentId });

            await transaction.commit();

            return {
                message: '댓글 삭제하기에 성공하셨습니다.',
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }

            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('댓글 삭제하기에 실패했습니다.');
            }
        }
    },

    getComment: async ({ userId, postId }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();

            let commentList = [];

            const user = await UserModel.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const post = await PostModel.findById({ postId });

            if (!post) {
                throw new NotFoundError('요청한 게시물의 정보를 찾을 수 없습니다.');
            }
            // cursor == 0 이면, 처음으로 댓글 불러오기.
            if (cursor == 0) {
                commentList = await Comment.recentComment({ postId });

                // cursor == -1 이면, 모든 댓글 불러오기 끝.
            } else if (cursor == -1) {
                commentList = '전체 댓글 조회가 끝났습니다.';
            } else {
                commentList = await Comment.select({ postId, cursor });
            }

            await transaction.commit();

            return {
                message: '게시글 댓글 불러오기에 성공하셨습니다.',
                commentList,
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }

            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('게시글 댓글 불러오기에 실패했습니다.');
            }
        }
    },
};

export { commentService };
