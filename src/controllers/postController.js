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
            posts = await postService.getAllPosts();

            statusCode.setResponseCode200(res);
            res.send({ message: posts.message, postList: posts.posts });
        } catch (error) {
            next(error);
        }
    },
};

export { postController };
