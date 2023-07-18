import { db } from '../index.js';

const PostModel = {
    create: async function ({ newPost }) {
        const createNewPost = await db.Post.create(newPost);
        return createNewPost;
    },
    getAllPosts: async function ({ offset, limit }) {
        const { count, rows: posts } = await db.Post.findAndCountAll({ offset, limit });
        return { total: count, posts };
    },
    getPostById: async function (postId) {
        const post = await db.Post.findOne({
            where: {
                postId: postId,
            },
        });
        return post;
    },
    update: async function ({ postId, fieldToUpdate, newValue }) {
        const updatePost = await db.Post.update(
            { [fieldToUpdate]: newValue },
            {
                where: { postId },
            },
        );
        return updatePost;
    },
};

export { PostModel };
