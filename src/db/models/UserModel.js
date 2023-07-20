import { db } from '../index.js';

const UserModel = {
    create: async newUser => {
        const createNewUser = await db.User.create(newUser);
        return createNewUser;
    },
    bulkCreateTags: async (tags, userId) => {
        if (tags && tags.length > 0) {
            const newTags = tags.map(tagId => {
                return {
                    tag_id: tagId,
                    user_id: userId,
                };
            });
            await db.UserAndTag.bulkCreate(newTags);
        }
    },
    bulkUpdateTags: async (tags, userId) => {
        if (tags && tags.length > 0) {
            const newTags = tags.map(tagId => {
                return {
                    tag_id: tagId,
                    user_id: userId,
                };
            });
            await db.UserAndTag.bulkCreate(tags);

            await UserModel.bulkCreate(newTags, {
                updateOnDuplicate: ['tag_id', 'user_id'],
                transaction,
            });
        }
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
        console.log('유저 모델에서 userId, updateData', userId, updateData);
        const updatedUser = await db.User.update(updateData, {
            where: {
                user_id: userId,
                is_deleted: 0,
            },
            returning: true,
        });
        console.log('유저 모델의 updatedUser', updatedUser);
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
