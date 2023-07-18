import { db } from '../index.js';

const CommentModel = {
    // 댓글 생성
    create: async function ({ newComment }) {
        const createComment = await db.Comment.create(newComment);

        return createComment;
    },

    // 댓글 수정
    update: async function ({ postId, commentId, content }) {
        const updateComment = await db.Comment.update({ conetent: content }, { where: id: commentId , postId: postId });

        return updateComment;
    },

    // 댓글 삭제
    delete: async function ({ commentId }) {
        const deleteComment = await db.Comment.delete(commentId);

        return deleteComment;
    },

    // 댓글 불러오기
    select: async function ({ postId }) {
        const getComment = await db.Comment.findAll(postId);

        return getComment;
        
    },
};

export { CommentModel };
