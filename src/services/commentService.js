import { db } from '../db/index.js';
import { CommentModel } from '../db/models/CommentModel.js';
import { userModel } from '../db/models/userModel.js';
import { UnauthorizedError, NotFoundError, InternalServerError } from '../middlewares/errorMiddleware.js';

const commentService = {
    createComment: async function ({ userId, postId, commentId, content }) {
        try {
            transaction = await db.sequelize.transaction();

            const user = await userModel.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            await CommentModel.create({ postId, commentId, content });

            await transaction.commit();

            return {
                message: '댓글 추가하기에 성공했습니다.',
            };
        } catch (error) {
            if (transaction) {
                await transaction.roolback();
            }
            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('댓글 추가하기에 실패했습니다.');
            }
        }
    },

    updateComment: async function ({ userId, postId, commentId, content }) {
        try {
            transaction = await db.sequelize.transaction();

            const user = await userModel.findById({ userId });

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
                await transaction.rollback;
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

    deleteComment: async function ({ userId, commentId }) {
        try {
            transaction = await db.sequelize.transaction();

            const user = await userModel.findById({ userId });

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
                await transaction.rollback;
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

    getComment: async function ({ userId, postId }) {
        try {
            transaction = await db.sequelize.transaction();

            const user = await userModel.findById({ userId });

            if (!user) {
                throw new UnauthorizedError('잘못된 또는 만료된 토큰입니다.');
            }

            const post = await PostModel.findById({ postId });

            if (!post) {
                throw new NotFoundError('요청한 게시물의 정보를 찾을 수 없습니다.');
            }

            if (cursor == 0) {
                CommentList = await Comment.zeroComment({ postId });
            } else if (cursor == -1) {
                CommentList = ['전체 댓글 조회가 끝났습니다.', '전체 댓글 조회가 끝났습니다.'];
            } else {
                CommentList = await Comment.select({ postId, cursor });
            }

            await transaction.commit();

            return {
                message: '게시글 총 댓글 불러오기에 성공하셨습니다.',
                CommentListZero: CommentList[0],
                CommentListOther: CommentList[1],
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
                throw new InternalServerError('게시글 총 댓글 불러오기에 실패했습니다.');
            }
        }
    },
};

export { commentService };
