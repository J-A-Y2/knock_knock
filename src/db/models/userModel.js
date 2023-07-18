import { db } from '../index.js';

const UserModel = {
    create: async function ({ newUser }) {
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
    findById: async function (userId) {
        const user = await db.User.findOne({
            where: {
                userId: userId,
                isDeleted: 0,
            },
        });
        return user;
    },
    update: async function ({ userId, updateData }) {
        console.log('모델에 있는 updateUser얌!!', updateData);
        const updatedUser = await db.User.update(updateData, {
            where: {
                userId: userId,
                isDeleted: 0,
            },
        });
        return updatedUser;
    },
    delete: async function (userId) {
        const deleteUser = await db.User.destroy({
            where: {
                userId: userId,
                isDeleted: 0,
            },
        });
        return deleteUser;
    },
};

export { UserModel };
