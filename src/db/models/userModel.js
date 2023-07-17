import { db } from '../index.js';
import { Op } from 'sequelize';

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
            throw new Error('user를 생성하는 데 실패했습니다.');
        }
    },

    findByEmail: async function (email) {
        try {
            const user = await db.User.findOne({
                attributes: ['email'],
                where: {
                    email: email,
                    isDeleted: 0,
                },
            });

            return user;
        } catch (error) {
            console.error(error);
            throw new Error('user를 검색하는 데 실패했습니다.');
        }
    },
};

export { UserModel };
