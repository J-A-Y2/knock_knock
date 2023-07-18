import { db } from '../index.js';

const PostModel = {
    create: async function ({ newPost }) {
        try {
            const createNewPost = await db.Post.create(newPost);
            return createNewPost;
        } catch (error) {
            console.log('modelErr', error);
        }
    },
};

export { PostModel };
