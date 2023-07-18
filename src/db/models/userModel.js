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
    updateUser: async function ({ userId, updatedUser }) {
        const updateUser = await db.User.update({
            where: {
                userId: userId,
                isDeleted: 0,
            },
        });
        return updateUser;
    },
    deleteUser: async function (userId) {
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
