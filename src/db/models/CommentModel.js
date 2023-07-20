import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { db } from '../index.js';

const CommentModel = {
    // 댓글 생성
    create: async ({ userId, postId, content }) => {
        console.log({ userId, postId, content });
        const createComment = await db.Comment.create({ user_id: userId, post_id: postId, comment_content: content });
        return createComment;
    },

    //댓글 찾기
    findByCommentId: async ({ commentId }) => {
        const getComment = await db.Comment.findOne({
            where: {
                comment_id: commentId,
            },
        });
        return getComment;
    },

    // 댓글 수정
    update: async ({ userId, postId, commentId, content }) => {
        const updateComment = await db.Comment.update(
            { comment_content: content },
            {
                where: {
                    user_id: userId,
                    post_id: postId,
                    comment_id: commentId,
                },
            },
        );
        return updateComment;
    },

    // 댓글 삭제
    delete: async ({ commentId }) => {
        console.log({ commentId });
        const deleteComment = await db.Comment.destroy({
            where: {
                comment_id: commentId,
            },
        });
        return deleteComment;
    },

    // 댓글 불러오기 (무한스크롤) 커서는 댓글의 아이디 값
    getComment: async ({ postId, cursor }) => {
        const getComment = await db.Comment.findAll({
            attributes: ['comment_id', 'user_id', 'nickname', 'content', 'createdAt'],
            where: {
                post_id: postId,
                id: {
                    [Op.lt]: cursor,
                },
            },
            include: [
                {
                    model: db.User,
                    attributes: ['nickname'],
                },
            ],
            order: [['createdAt', 'DESC']],
            limit: 10,
        });

        return getComment;
    },

    recentComment: async postId => {
        console.log(3);
        const recentComment = await db.Comment.findAll({
            attributes: ['comment_id', 'user_id', [sequelize.literal('User.nickname'), 'nickname'], 'content', 'createdAt'],

            include: [
                {
                    model: db.User,
                    attributes: [],
                },
            ],
            where: {
                post_id: postId,
            },
            limit: 10,
            order: [['created_at', 'DESC']],
        });

        return recentComment;
    },
};

export { CommentModel };
