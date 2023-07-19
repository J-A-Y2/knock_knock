import { db } from '../index.js';

const CommentModel = {
    // 댓글 생성
    create: async function ({ userId, postId, content }) {
        const createComment = await db.Comment.create(userId, postId, content);
        return createComment;
    },

    // 댓글 수정
    update: async function ({ userId, postId, commentId, content }) {
        const updateComment = await db.Comment.update({
            where: {
                user_id: userId,
                post_id: postId,
                comment_id: commentId,
                content: content,
            },
        });
        return updateComment;
    },

    // 댓글 삭제
    delete: async function ({ commentId }) {
        const deleteComment = await db.Comment.destroy(commentId);

        return deleteComment;
    },

    // 댓글 불러오기 (무한스크롤)
    select: async function ({ postId }) {
        const getComment = await db.Comment.findAll(postId);

        return getComment;
    },
};

export { CommentModel };
