import sequelize from 'sequelize';
import { db } from '../index.js';

const CommentModel = {
    // 댓글 생성
    create: async ({ userId, postId, content }) => {
        const createComment = await db.Comment.create(userId, postId, content);
        return createComment;
    },

    // 댓글 수정
    update: async ({ userId, postId, commentId, content }) => {
        const updateComment = await db.Comment.update(content, {
            where: {
                user_id: userId,
                post_id: postId,
                comment_id: commentId,
            },
        });
        return updateComment;
    },

    // 댓글 삭제
    delete: async ({ commentId }) => {
        const deleteComment = await db.Comment.destroy(commentId);
        return deleteComment;
    },

    // 댓글 불러오기 (무한스크롤)
    select: async ({ postId, cursor }) => {
        const getAllRecentComment = await db.Comment.findAll({
            attributes: [
                'id',
                'userId',
                [sequelize.literal('user.nickname'), 'nickname'],
                [sequelize.literal('user_image.imageUrl'), 'imageUrl'],
                'content',
                'createdAt',
            ],
            include: [
                {
                    model: UserModel,
                    attributes: [],
                },
                {
                    model: UserImageModel,
                    attributes: [],
                },
            ],
            where: {
                postId: postId,
                id: {
                    [Op.lt]: cursor,
                },
            },
            order: [['createdAt', 'DESC']],
            limit: 10,
        });

        const getAllComenet = await db.Comment.findAll({
            attributes: [
                'id',
                'userId',
                [sequelize.literal('user.nickname'), 'nickname'],
                [sequelize.literal('user_image.imageUrl'), 'imageUrl'],
                'content',
                'parentId',
                'createdAt',
            ],
            include: [
                {
                    model: UserModel,
                    attributes: [],
                },
                {
                    model: UserImageModel,
                    attributes: [],
                },
            ],
            where: {
                postId: postId,
                parentId: {
                    [Op.ne]: 0,
                },
            },
            order: [['createdAt', 'DESC']],
        });

        return [getAllRecentComment, getAllComenet];
    },
};

export { CommentModel };
