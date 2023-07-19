import { db } from '../index.js';

const PostModel = {
    create: async ({ newPost }) => {
        try {
            const createNewPost = await db.Post.create(newPost);
            return createNewPost;
        } catch (e) {
            console.log(e);
        }
    },
    getAllPosts: async ({ offset, limit }) => {
        const { count, rows: posts } = await db.Post.findAndCountAll({ offset, limit });
        return { total: count, posts };
    },
    getPostById: async postId => {
        const post = await db.Post.findOne({
            where: {
                post_id: postId,
            },
        });
        console.log(post);
        return post;
    },
    update: async ({ postId, fieldToUpdate, newValue }) => {
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
