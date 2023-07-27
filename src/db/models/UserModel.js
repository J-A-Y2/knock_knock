import { db } from '../index.js';

const UserModel = {
    create: async newUser => {
        return await db.User.create(newUser);
    },
    bulkCreateTags: async ({ newTags, transaction }) => {
        return await db.UserTag.bulkCreate(newTags, { transaction });
    },
    deleteTags: async (userId, tagCategoryId) => {
        try {
            // 모든 userTagId들을 찾아서 userId, tag_categoryId와 일치하는 데이터 삭제
            const userTags = await db.UserTag.findAll({
                where: {
                    userId,
                },
                include: [
                    {
                        model: db.Tag,
                        where: {
                            tagCategoryId,
                        },
                    },
                ],
            });
            const userTagIds = userTags.map(userTag => userTag.userTagId);

            // UserTag 행들 삭제
            const deleteCount = await db.UserTag.destroy({
                where: {
                    userTagId: userTagIds,
                },
            });

            return deleteCount;
        } catch (error) {
            console.error(error);
        }
    },
    createImageURL: async (imageURL, userId, imageCategoryId) => {
        return await db.Image.create({
            imageURL,
            userId,
            imageCategoryId,
        });
    },
    findImage: async (userId, imageCategoryId) => {
        return await db.Image.findOne({
            userId,
            imageCategoryId,
        });
    },
    findTagId: async (tagname, tagCategoryId) => {
        const tagId = await db.Tag.findOne({
            where: {
                tagname,
                tagCategoryId,
            },
        });

        return tagId;
    },
    findByUserId: async userId => {
        try {
            return await db.UserTag.findAll({
                where: {
                    userId,
                },
                include: [
                    {
                        model: db.Tag,
                        attributes: ['tagCategoryId'],
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
                email,
                isDeleted: 0,
            },
        });

        return user;
    },
    findById: async userId => {
        const user = await db.User.findOne({
            where: {
                userId,
                isDeleted: 0,
            },
            include: [
                {
                    model: db.UserTag,
                    attributes: ['userId'],
                    include: [{ model: db.Tag, attributes: ['tagname', 'tagCategoryId'] }],
                },
            ],
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
    findMyPosts: async userId => {
        return await db.Post.findAll({
            where: {
                userId,
            },
        });
    },
    findMyParticipants: async userId => {
        return await db.Participant.findAll({
            where: {
                userId,
            },
        });
    },
    // 유저 정보 업데이트
    update: async ({ userId, updateData }) => {
        try {
            const updatedUser = await db.User.update(updateData, {
                where: {
                    userId,
                    isDeleted: 0,
                },
            });

            return updatedUser;
        } catch (error) {
            console.error(error);
        }
    },
    // 유저 정보 삭제
    delete: async ({ userId }) => {
        const deleteUser = await db.User.update(
            {
                isDeleted: 1,
                deletedAt: new Date(),
            },
            {
                where: {
                    userId,
                    isDeleted: 0,
                },
            },
        );
        return deleteUser;
    },
};

export { UserModel };
