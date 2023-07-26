import { Op } from 'sequelize';
import { db } from '../index.js';

const CommentModel = {
    // 댓글 생성
    create: async ({ userId, postId, content }) => {
        const createComment = await db.Comment.create({ userId, postId, commentContent: content });
        return createComment;
    },

    //댓글 찾기
    findByCommentId: async ({ commentId }) => {
        const getComment = await db.Comment.findOne({
            where: {
                commentId,
            },
        });
        return getComment;
    },

    // 댓글 수정
    update: async ({ userId, postId, commentId, content }) => {
        const updateComment = await db.Comment.update(
            { commentContent: content },
            {
                where: {
                    userId,
                    postId,
                    commentId,
                },
            },
        );
        return updateComment;
    },

    // 댓글 삭제
    delete: async ({ commentId }) => {
        const deleteComment = await db.Comment.destroy({
            where: {
                commentId,
            },
        });
        return deleteComment;
    },

    // 댓글 불러오기 (무한스크롤) 커서는 댓글의 아이디 값
    getComment: async ({ postId, cursor }) => {
        const getComment = await db.Comment.findAll({
            attributes: ['commentId', 'userId', 'commentContent', 'createdAt'],
            include: [
                {
                    model: db.User,
                    attributes: ['nickname'],
                },
            ],
            order: [['createdAt', 'DESC']],
            where: {
                postId,
                commentId: {
                    [Op.lt]: cursor,
                },
            },
            limit: 10,
        });

        return getComment;
    },

    recentComment: async postId => {
        const recentComment = await db.Comment.findAll({
            attributes: ['commentId', 'userId', 'commentContent', 'createdAt'],
            include: [
                {
                    model: db.User,
                    attributes: ['nickname'],
                },
            ],
            where: {
                postId,
            },
            limit: 10,

            order: [['createdAt', 'DESC']],
        });

        return recentComment;
    },
};

export { CommentModel };
