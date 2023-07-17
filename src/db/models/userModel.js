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
