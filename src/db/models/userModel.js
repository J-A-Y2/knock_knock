import { db } from '../index.js';

const UserModel = {
    create: async function ({ username, email, userPassword, nickname, gender, birthday, job }) {
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
    update: async function ({ nickname, profileImage, mbti, religion, height, hobby, personality, ideal, introduce }) {
        const updateUser = await db.User.update({
            nickname: nickname,
            profileImage: profileImage,
            mbti: mbti,
            religion: religion,
            height: height,
            hobby: hobby,
            personality: personality,
            ideal: ideal,
            introduce: introduce,
        });
        return updateUser;
    },
    delete: async function (userId) {
        const deleteUser = await db.User.destory({
            where: {
                userId: userId,
                isDeleted: 0,
            },
        });
        return deleteUser;
    },
};

export { UserModel };
