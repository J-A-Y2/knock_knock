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
};

export { UserModel };
