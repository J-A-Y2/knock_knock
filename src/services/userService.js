import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db/schemas';
import { UserModel } from '../db/models/userModel.js';

const userService = {
    createUser: async function ({ userName, email, userPassword, nickname, gender, birthday, job }) {
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
    },
    getUser: async function ({ email, password }) {
        try {
            await db.beginTransaction();
            const user = await User.findByEmail(email);

            if (!user) {
                throw new Error('가입 내역이 없는 이메일입니다. 다시 한 번 확인해 주세요');
            }

            if (user.is_deleted === true) {
                throw new Error('이미 탈퇴한 회원입니다.');
            }

            const correctPasswordHash = user.user_password;
            const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

            if (!isPasswordCorrect) {
                throw new Error('비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.');
            }

            const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
            const token = jwt.sign(
                {
                    userId: user.user_id,
                    email: user.email,
                    name: user.nickname,
                },
                secretKey,
            );

            await db.commit();

            return {
                message: '로그인에 성공했습니다.',
                token,
                userId: user.user_id,
            };
        } catch (error) {
            await db.rollback();
        }
    },
};

export { userService };
