import { db } from '../index.js';

const UserModel = {
    create: async function ({ user_name, email, user_password, nickname, gender, birthday, job }) {
        try {
            const createNewUser = await db.User.create({
                userName: user_name,
                email: email,
                userPassword: user_password,
                nickname: nickname,
                gender: gender,
                birthday: birthday,
                job: job,
            });
            return createNewUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    findByEmail: async function (email) {
        const user = await db.User.findOne({
            where: {
                email: email,
                isDeleted: null,
            },
        });

        return user;
    },
};

export { UserModel };
