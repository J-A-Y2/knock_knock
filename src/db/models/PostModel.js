import { db } from '../index.js';

const PostModel = {
    create: async ({ newPost }) => {
        const post = await db.Post.create(newPost);
        return post;
    },
    getAllPosts: async ({ offset, limit }) => {
        const { count, rows: posts } = await db.Post.findAndCountAll({
            offset,
            limit,
            include: [{ model: db.User, attributes: ['nickname'] }],
        });
        return { total: count, posts };
    },
    getFilteredPosts: async ({ offset, limit, type }) => {
        const { count, rows: posts } = await db.Post.findAndCountAll({
            where: { post_type: type },
            offset,
            limit,
            include: [{ model: db.User, attributes: ['nickname'] }],
        });
        return { total: count, posts };
    },
    getPostById: async postId => {
        const post = await db.Post.findOne({
            where: {
                post_id: postId,
            },
        });
        return post;
    },
    update: async ({ transaction, postId, fieldToUpdate, newValue }) => {
        const updatePost = await db.Post.update(
            { [fieldToUpdate]: newValue },
            {
                where: { post_id: postId },
                transaction,
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
