import { db } from '../index.js';

const PostModel = {
    create: async ({ newPost }) => {
        await db.Post.create(newPost);
    },
    getAllPosts: async ({ offset, limit }) => {
        const { count, rows: posts } = await db.Post.findAndCountAll({ offset, limit });
        return { total: count, posts };
    },
    getPostById: async ({ postId }) => {
        const post = await db.Post.findOne({
            where: {
                post_id: postId,
            },
        });
        return post;
    },
    update: async ({ postId, fieldToUpdate, newValue }) => {
        const updatePost = await db.Post.update(
            { [fieldToUpdate]: newValue },
            {
                where: { post_id: postId },
            },
        );
        return updatePost;
    },
    delete: async postId => {
        await db.Post.destroy({
            where: { post_id: postId },
        });
    },
};

export { PostModel };
