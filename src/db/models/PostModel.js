import { db } from '../index.js';

const PostModel = {
    create: async function ({ newPost }) {
        const createNewPost = await db.Post.create(newPost);
        return createNewPost;
    },
    getAllPosts: async function () {
        const posts = await db.Post.findAll();
        console.log('model', posts);
        return posts;
    },
};

export { PostModel };
