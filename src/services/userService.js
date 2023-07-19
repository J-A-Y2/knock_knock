import dotenv from 'dotenv';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    ConflictError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    InternalServerError,
} from '../middlewares/errorMiddleware.js';
import { UserModel } from '../db/models/UserModel.js';
import { db } from '../db/index.js';

const userService = {
    // 유저 생성
    createUser: async ({ newUser }) => {
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
    //유저 로그인
    getUser: async ({ email, password }) => {
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
    // 유저 로그인 확인
    loginCheck: async ({ userId }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            const user = await UserModel.findById(userId);

            if (!user) {
                throw new NotFoundError('회원의 정보를 찾을 수 없습니다.');
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
    // 유저 정보 조회
    getUserById: async ({ userId }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            const user = await UserModel.findById(userId);

            if (!user) {
                throw new NotFoundError('회원 정보를 찾을 수 없습니다.');
            }
            console.log('유저서비스 user', user);
            await transaction.commit();
            return {
                message: '회원정보 조회 성공!',
                userId: user.userId,
                email: user.email,
                username: user.username,
                nickname: user.nickname,
                gender: user.gender,
                birthday: user.birthday,
                job: user.job,
                region: user.region,
                profileImage: user.profileImage,
                mbti: user.mbti,
                religion: user.religion,
                height: user.height,
                hobby: user.hooby,
                personality: user.perosnality,
                ideal: user.ideal,
                introduce: user.introduce,
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('회원 정보를 조회하는 데 실패했습니다.');
            }
        }
    },
    // 유저 정보 수정
    updateUser: async function ({ userId, updateData }) {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();
            const user = await UserModel.findById(userId);

            if (!user) {
                throw new NotFoundError('회원 정보를 찾을 수 없습니다.');
            }

            await UserModel.update({ userId, updateData });
            const updatedUser = await UserModel.findById(userId);

            await transaction.commit();

            return {
                message: '회원 정보가 수정되었습니다.',
                nickname: updatedUser.nickname,
                job: updatedUser.job,
                region: updatedUser.region,
                profileImage: updatedUser.profileImage,
                mbti: updatedUser.mbti,
                religion: updatedUser.religion,
                height: updatedUser.height,
                hobby: updatedUser.hobby,
                personality: updatedUser.personality,
                ideal: updatedUser.ideal,
                introduce: updatedUser.introduce,
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('회원 정보를 수정하는 데 실패했습니다.');
            }
        }
    },
    // 유저 정보 삭제
    deleteUser: async ({ userId }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();

            const user = await UserModel.findById(userId);

            if (!user) {
                throw new NotFoundError('사용자의 정보를 찾을 수 없습니다.');
            }

            // softdelete로 삭제하는 기능
            await UserModel.delete({ userId });

            await transaction.commit();
            return { message: '회원이 성공적으로 탈퇴하였습니다.' };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof UnauthorizedError) {
                throw error;
            } else if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('회원 탈퇴하는 데 실패했습니다.');
            }
        }
    },
};

export { userService };
