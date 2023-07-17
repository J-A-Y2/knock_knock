import { User } from '../index.js';
import { db } from '../index.js';

// {
//   userId,
//     email,
//     userName,
//     userPassword,
//     nickname,
//     gender,
//     birthday,
//     job,
//     profileImage,
//     mbti,
//     religion,
//     height,
//     hobby,
//     personality,
//     ideal,
//     introduce;
// }

const UserModel = {
    create: async function ({ userName, email, userPassword, nickname, gender, birthday, job }) {
        console.log(userName, email, userPassword, nickname, gender, birthday, job);
        const createNewUser = await User.create({
            userName: userName,
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
        const user = await User.findOne({
            where: {
                email: email,
                isDeleted: null,
            },
        });

        return user;
    },
};

export { UserModel };
