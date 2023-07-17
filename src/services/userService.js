import { UserModel } from '../db/models/userModel.js';
// import bcrypt from "bcrypt";

class userService {
    // 유저 생성
    static async createUser({ userName, email, userPassword, nickname, gender, birthday, job }) {
        try {
            await db.query('START TRANSACTION');

            // 이메일 중복 확인
            const user = await UserModel.findByEmail({ email });

            if (user) {
                throw new error('이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.');
            }

            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.PW_HASH_COUNT));

            await UserModel.create({
                email,
                password: hashedPassword,
                nickname,
                imageUrl,
            });

            // await mysqlDB.query('COMMIT');

            return {
                message: '회원가입에 성공했습니다.',
            };
        } catch (error) {
            // await mysqlDB.query('ROLLBACK');

            if (error instanceof ConflictError) {
                throw error;
            } else {
                throw new BadRequestError('회원가입에 실패했습니다.');
            }
        }
    }
}

export { userService };
