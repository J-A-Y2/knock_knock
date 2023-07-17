import { db } from '../index.js';

const UserModel = {
    create: async function ({ username, email, userPassword, nickname, gender, birthday, job }) {
        try {
            const createNewUser = await db.User.create({
                username: username,
                email: email,
                userPassword: userPassword,
                nickname: nickname,
                gender: gender,
                birthday: birthday,
                job: job,
            });
            return createNewUser;
        } catch (err) {
            console.log(err);
        }
    },
    findByEmail: async function (email) {
        console.log('email', email);
        const user = await db.User.findOne({
            where: {
                email: email,
                isDeleted: 0,
            },
        });
        console.log(user);

        return user;
    },
};

export { UserModel };
