import { statusCode } from '../utils/statusCode.js';
import { postService } from '../services/postService.js';
const postController = {
    createPost: async function (req, res, next) {
        try {
            const userId = req.currentUserId;

            const { postTitle, postContent, postType, people, place, meetingTime } = req.body;

            const createPost = await postService.createPost({
                userId,
                post: { postTitle, postContent, postType, people, place, meetingTime },
            });
            statusCode.setResponseCode201(res);
            res.send(createPost.message);
        } catch (error) {
            next(error);
        }
    },
    getAllPosts: async function (req, res, next) {
        try {
            const page = parseInt(req.query.page || 1);
            const perPage = parseInt(req.query.perPage || 1);

            const posts = await postService.getAllPosts({ page, perPage });

            statusCode.setResponseCode200(res);
            res.send({ message: posts.message, allPostCount: posts.total, currentPage: page, postList: posts.posts });
        } catch (error) {
            next(error);
        }
    },
};

export { postController };
