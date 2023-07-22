import { db } from '../index.js';

const UserModel = {
    create: async newUser => {
        return await db.User.create(newUser);
    },
    bulkCreateTags: async ({ newTags, transaction }) => {
        return await db.UserAndTag.bulkCreate(newTags, { transaction });
    },
    deleteTags: async (userId, tagCategoryId) => {
        try {
            // 모든 user_and_tag_id들을 찾아서 user_id, tag_category_id와 일치하는 데이터 삭제
            const userAndTags = await db.UserAndTag.findAll({
                where: {
                    user_id: userId,
                },
                include: [
                    {
                        model: db.Tag,
                        where: {
                            tag_category_id: tagCategoryId,
                        },
                    },
                ],
            });
            console.log('userAndTags: ', userAndTags);
            const userAndTagIds = userAndTags.map(userAndTag => userAndTag.user_and_tag_id);
            console.log('userAndTagIds: ', userAndTagIds);
            // UserAndTag 행들 삭제
            const deleteCount = await db.UserAndTag.destroy({
                where: {
                    user_and_tag_id: userAndTagIds,
                },
            });
            console.log('deleteCount: ', deleteCount);
            return deleteCount;
        } catch (error) {
            console.error(error);
        }
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
    findByUserId: async userId => {
        try {
            return await db.UserAndTag.findAll({
                where: {
                    user_id: userId,
                },
                include: [
                    {
                        model: db.Tag,
                        attributes: ['tag_category_id'],
                    },
                ],
            });
        } catch (error) {
            console.error(error);
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
        try {
            const updatedUser = await db.User.update(updateData, {
                where: {
                    user_id: userId,
                    is_deleted: 0,
                },
            });

            return updatedUser;
        } catch (error) {
            console.error(error);
        }
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
