import { commentService } from '../services/commentService.js';
import { statusCode } from '../utils/statusCode.js';

const commentController = {
    create: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const { postId, content } = req.body;

            const createComment = await commentService.createComment({ userId, postId, content });

            statusCode.setResponseCode201(res);
            return res.send({ message: createComment.message });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const commentId = req.params.commentId;
            const { postId, content } = req.body;

            const updateComment = await commentService.updateComment({ userId, postId, commentId, content });

            statusCode.setResponseCode200(res);
            return res.send({ message: updateComment.message });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const commentId = req.params.commentId;

            const deleteComment = await commentService.deleteComment({ userId, commentId });
            statusCode.setResponseCode200(res);

            return res.send({ message: deleteComment.message });
        } catch (error) {
            next(error);
        }
    },

    getComment: async (req, res, next) => {
        try {
            const postId = req.query.postId;
            const cursor = req.query.cursor;

            const getComment = await commentService.getComment({ postId, cursor });

            console.log('getComment:', getComment);

            statusCode.setResponseCode200(res);
            return res.send({
                message: getComment.message,
                commentList: getComment.commentList,
            });
        } catch (error) {
            next(error);
        }
    },
};

export { commentController };
