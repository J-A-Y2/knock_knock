import { db } from '../index.js';

const PostModel = {
    create: async ({ newPost }) => {
        const post = await db.Post.create(newPost);
        console.log(post);
        return post;
    },
    getAllPosts: async ({ offset, limit }) => {
        const { count, rows: posts } = await db.Post.findAndCountAll({
            offset,
            limit,
            include: [{ model: db.User, attributes: ['nickname', 'profileImage'] }],
            order: [
                ['createdAt', 'DESC'],
                ['postId', 'DESC'],
            ],
        });
        return { total: count, posts };
    },
    getFilteredPosts: async ({ offset, limit, type }) => {
        const { count, rows: posts } = await db.Post.findAndCountAll({
            where: { postType: type },
            offset,
            limit,
            include: [{ model: db.User, attributes: ['nickname', 'profileImage'] }],
            order: [
                ['createdAt', 'DESC'],
                ['postId', 'DESC'],
            ],
        });
        return { total: count, posts };
    },
    getPostById: async postId => {
        const post = await db.Post.findOne({
            where: {
                postId,
            },
        });
        return post;
    },
    update: async ({ transaction, postId, fieldToUpdate, newValue }) => {
        const updatePost = await db.Post.update(
            { [fieldToUpdate]: newValue },
            {
                where: { postId },
                transaction,
            },
        );
        return updatePost;
    },
    delete: async postId => {
        await db.Post.destroy({
            where: { postId },
        });
    },
};

export { PostModel };
