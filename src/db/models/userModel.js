import { db } from '../index.js';
import { Op } from 'sequelize';
const UserModel = {
    create: async ({ newUser }) => {
        const createNewUser = await db.User.create(newUser);
        return createNewUser;
    },

    findByEmail: async function (email) {
        const user = await db.User.findOne({
            where: {
                email: email,
                isDeleted: 0,
            },
        });

        return user;
    },
    findById: async userId => {
        const user = await db.User.findOne({
            where: {
                userId: userId,
                isDeleted: 0,
            },
        });
        return user;
    },
    update: async ({ userId, updateData }) => {
        const updatedUser = await db.User.update(updateData, {
            where: {
                userId: userId,
                isDeleted: 0,
            },
        });
        return updatedUser;
    },
    delete: async ({ userId }) => {
        const deleteUser = await db.User.update(
            {
                isDeleted: 1,
                deletedAt: new Date(),
            },
            {
                where: {
                    userId: userId,
                    isDeleted: 0,
                },
            },
        );
        return deleteUser;
    },
    practice: async ({}) => {
        const practiceUpdate = await db.User.update(
            { 컬럼명: '바꿀 내용' },
            {
                where: { userId },
            },
        );

        const practiceFind = await db.User.findAll({
            attributes: ['username', 'height'],
            where: {
                [Op.or]: [{ username: '허창원' }, { height: { [Op.gte]: 175 } }],
            },
            order: [['username'], ['height', 'DESC']],
            limit: 5,
            offset: 2,
        });
    },
};

export { UserModel };

// Op.gt(초과), Op.gte(이상), Op.lt(미만), Op.lte(이하), Op.ne(같지않음), Op.and(그리고), Op.or(또는), Op.in(배열 요소 중 하나), Op.notIn(배열 요소와 모두 다름)
