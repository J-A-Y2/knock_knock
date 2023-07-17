import { User } from '../index.js';

class UserModel {
    static async create({ newUser }) {
        const createNewUser = await User.create(newUser);
        return createNewUser;
    }
}

export { UserModel };

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
    findByEmail: async function (email) {
        const user = await db.findOne({
            where: {
                email: email,
                isDeleted: null,
            },
        });

        return user;
    },
};

export { UserModel };
