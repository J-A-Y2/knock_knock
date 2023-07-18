import dotenv from 'dotenv';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConflictError, BadRequestError, NotFoundError, UnauthorizedError } from '../middlewares/errorMiddleware.js';
import { UserModel } from '../db/models/UserModel.js';
import { db } from '../db/index.js';

const userService = {
    createUser: async function ({ newUser }) {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();

            //이메일 중복 확인
            const user = await UserModel.findByEmail(newUser.email);

            if (user) {
                throw new ConflictError('이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.');
            }

            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(newUser.userPassword, parseInt(process.env.PW_HASH_COUNT));
            newUser.userPassword = hashedPassword;
            await UserModel.create({ newUser });
            await transaction.commit();

            return {
                message: '회원가입에 성공했습니다.',
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }

            if (error instanceof ConflictError) {
                throw error;
            } else {
                throw new BadRequestError('회원가입에 실패했습니다.');
            }
        }
    },
    getUser: async function ({ email, password }) {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            const user = await UserModel.findByEmail(email);

            if (!user) {
                throw new NotFoundError('가입 내역이 없는 이메일입니다. 다시 한 번 확인해 주세요');
            }

            if (user.isDeleted === true) {
                throw new BadRequestError('이미 탈퇴한 회원입니다.');
            }

            console.log('email', email);
            console.log('password', password);
            console.log('user.userPassword', user.userPassword);

            const correctPasswordHash = user.userPassword;
            const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

            if (!isPasswordCorrect) {
                throw new UnauthorizedError('비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.');
            }

            const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
            const token = jwt.sign(
                {
                    userId: user.userId,
                    email: user.email,
                    name: user.nickname,
                },
                secretKey,
            );

            await transaction.commit();

            return {
                message: '로그인에 성공했습니다.',
                token,
                userId: user.userId,
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof NotFoundError) {
                throw error;
            } else if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new UnauthorizedError('로그인에 실패하였습니다.');
            }
        }
    },
    loginCheck: async function (userId) {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            const user = UserModel.findById(userId);

            if (!user) {
                throw new ConflictError('요청한 사용자의 정보를 찾을 수 없습니다.');
            }
            await transaction.commit();
            return {
                message: '정상적인 유저입니다.',
                userId: user.userId,
                email: user.email,
                nickname: user.nickname,
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            throw error;
        }
    },
};

export { userService };
