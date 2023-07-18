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
};

export { PostModel };
