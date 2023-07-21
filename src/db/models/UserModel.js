import { db } from '../index.js';

const UserModel = {
    create: async newUser => {
        return await db.User.create(newUser);
    },
    bulkCreateTags: async ({ newTags, transaction }) => {
        return await db.UserAndTag.bulkCreate(newTags, { transaction });
    },
    deleteTags: async (userId, tagCategoryId) => {
        return await db.UserAndTag.destroy({
            where: {
                user_id: userId,
                tag_category_id: tagCategoryId,
            },
            include: [
                {
                    model: db.Tag,
                    attributes: [],
                },
            ],
        });
    },
    findTagId: async (tagname, tagCategoryId) => {
        const tagId = await db.Tag.findOne({
            where: {
                tagname: tagname,
                tag_category_id: tagCategoryId,
            },
        });

        return tagId;
    },
    findByEmail: async email => {
        const user = await db.User.findOne({
            where: {
                email: email,
                is_deleted: 0,
            },
        });

        return user;
    },
    findById: async userId => {
        const user = await db.User.findOne({
            where: {
                user_id: userId,
                is_deleted: 0,
            },
        });
        return user;
    },
    findRandomUsers: async (gender, limit) => {
        const randomUsers = await db.User.findAll({
            where: {
                gender,
            },
            order: db.sequelize.random(),
            limit,
        });

        return randomUsers;
    },
    update: async ({ userId, updateData }) => {
        const updatedUser = await db.User.update(updateData, {
            where: {
                user_id: userId,
                is_deleted: 0,
            },
            returning: true,
        });

        return updatedUser[0];
    },
    delete: async ({ userId }) => {
        const deleteUser = await db.User.update(
            {
                is_deleted: 1,
                deleted_at: new Date(),
            },
            {
                where: {
                    user_id: userId,
                    is_deleted: 0,
                },
            },
        );
        return deleteUser;
    },
    destroy: async () => {
        const destroyTags = await db.UserAndTag.destroy({
            where: {
                user_id: userId,
                tag_id: newTags.map(tag => tag.tag_id),
                tag_type: tagType,
            },
        });
    },
};

export { UserModel };
