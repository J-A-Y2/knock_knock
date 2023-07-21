import bcrypt from 'bcrypt';
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
            const { hobby, personality, ideal, ...userInfo } = newUser;

            //이메일 중복 확인
            const user = await UserModel.findByEmail(newUser.email);

            if (user) {
                throw new ConflictError('이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.');
            }

            // 비밀번호 암호화
            const hashedPassword = await bcrypt.hash(userInfo.user_password, parseInt(process.env.PW_HASH_COUNT));
            userInfo.user_password = hashedPassword;

            const createdUser = await UserModel.create(userInfo);

            // 취미 태그 생성
            if (hobby && hobby.length > 0) {
                // 태그이름 배열을 태그아이디(정수) 배열로 변경
                const newTags = await Promise.all(
                    hobby.map(async hobbyTagName => {
                        const tagId = await UserModel.findTagId(hobbyTagName, 1);
                        return { tag_id: tagId.tag_id, user_id: createdUser.user_id };
                    }),
                );

                // userAndTags 테이블에 취미 데이터 생성
                await UserModel.bulkCreateTags({ newTags, transaction });
            }

            // 성격 태그 생성
            if (personality && personality.length > 0) {
                // 태그이름 배열을 태그아이디(정수) 배열로 변형
                const newTags = await Promise.all(
                    personality.map(async personalityTagName => {
                        const tagId = await UserModel.findTagId(personalityTagName, 2);
                        return { tag_id: tagId.tag_id, user_id: createdUser.user_id };
                    }),
                );
                // userAndTags 테이블에 성격 데이터 생성
                await UserModel.bulkCreateTags({ newTags, transaction });
            }

            // 이상형 태그 생성
            if (ideal && ideal.length > 0) {
                // 태그이름 배열을 태그아이디(정수) 배열로 변경, [(tagId,userId)] 형태로 변경
                const newTags = await Promise.all(
                    ideal.map(async idealTagName => {
                        const tagId = await UserModel.findTagId(idealTagName, 3);
                        return { tag_id: tagId.tag_id, user_id: createdUser.user_id };
                    }),
                );

                // userAndTags 테이블에 이상형 데이터 생성
                await UserModel.bulkCreateTags({ newTags, transaction });
            }

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

            if (user.is_deleted === true) {
                throw new BadRequestError('이미 탈퇴한 회원입니다.');
            }

            const correctPasswordHash = user.user_password;
            const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

            if (!isPasswordCorrect) {
                throw new UnauthorizedError('비밀번호가 일치하지 않습니다. 다시 한 번 확인해주세요.');
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

            await transaction.commit();

            return {
                message: '로그인에 성공했습니다.',
                token,
                userId: user.user_id,
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
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

            await transaction.commit();
            return {
                message: '회원정보 조회 성공!',
                userId: user.user_id,
                email: user.email,
                username: user.username,
                nickname: user.nickname,
                gender: user.gender,
                birthday: user.birthday,
                job: user.job,
                region: user.region,
                profileImage: user.profile_image,
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
            if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('회원 정보를 조회하는 데 실패했습니다.');
            }
        }
    },
    // 유저 랜덤으로 6명 네트워크페이지에 불러오기
    getRandomUsers: async userId => {
        try {
            const user = await UserModel.findById(userId);

            if (!user) {
                throw new NotFoundError('회원 정보를 찾을 수 없습니다.');
            }

            let genderToFind; // 로그인 유저가 남자면 여자를 보여기 그 반대도 마찬가지
            if (user.gender === '남') {
                genderToFind = '여';
            } else {
                genderToFind = '남';
            }

            const randomUsers = await UserModel.findRandomUsers(genderToFind, 6);

            if (!randomUsers || randomUsers.length === 0) {
                throw new NotFoundError('No users found.');
            }

            return {
                message: '랜덤으로 유저 6명 조회하기 성공!',
                randomUsers,
            };
        } catch (error) {
            throw new BadRequestError('랜덤으로 유저들을 조회하는 데 실패했습니다.');
        }
    },
    // 유저 정보 수정
    updateUser: async ({ userId, updateUserInfo }) => {
        let transaction;
        try {
            transaction = await db.sequelize.transaction();

            const { hobby, personality, ideal, ...updateData } = updateUserInfo;

            const user = await UserModel.findById(userId);

            if (!user) {
                throw new NotFoundError('회원 정보를 찾을 수 없습니다.');
            }

            const updatedUser = await UserModel.update({ userId, updateData });
            console.log('유저 서비스의 hobby ', hobby, 'personality: ', personality, 'ideal: ', ideal);
            // 취미 태그 수정
            if (hobby && hobby.length > 0) {
                // 태그 카테고리와 일치하는 태그들 삭제
                await UserModel.deleteTags(user.user_id, 1);

                // 태그이름 배열을 태그아이디(정수) 배열로 변형
                const hobbyTagIds = await Promise.all(
                    hobby.map(async hobbyTagName => {
                        const tagId = await UserModel.findTagId(hobbyTagName, 1);
                        return tagId.tag_id;
                    }),
                );
                // [(tagId,userId)] 형태로 변경
                const newTags = await Promise.all(
                    hobbyTagIds.map(async tagId => {
                        return {
                            tag_id: tagId,
                            user_id: user.user_id,
                        };
                    }),
                );
                // 수정할 태그들 userAndTags 테이블에 데이터 생성
                await UserModel.bulkCreateTags({ newTags, transaction });
            }

            // 성격 태그 수정
            if (personality && personality.length > 0) {
                await UserModel.deleteTags(user.user_id, 2);

                // 태그이름 배열을 태그아이디(정수) 배열로 변형
                const personalityTagIds = await Promise.all(
                    personality.map(async personalityTagName => {
                        const tagId = await UserModel.findTagId(personalityTagName, 2);
                        return tagId.tag_id;
                    }),
                );
                // [(tagId,userId)] 형태로 변경
                const newTags = await Promise.all(
                    personalityTagIds.map(async tagId => {
                        return {
                            tag_id: tagId,
                            user_id: user.user_id,
                        };
                    }),
                );
                // 수정할 태그들 userAndTags 테이블에 데이터 생성
                await UserModel.bulkCreateTags({ newTags, transaction });
            }

            // 이상형 태그 수정
            if (ideal && ideal.length > 0) {
                await UserModel.deleteTags(user.user_id, 3);

                // 태그이름 배열을 태그아이디(정수) 배열로 변형
                const idealTagIds = await Promise.all(
                    ideal.map(async idealTagName => {
                        const tagId = await UserModel.findTagId(idealTagName, 3);
                        return tagId.tag_id;
                    }),
                );
                // [(tagId,userId)] 형태로 변경
                const newTags = await Promise.all(
                    idealTagIds.map(async tagId => {
                        return {
                            tag_id: tagId,
                            user_id: user.user_id,
                        };
                    }),
                );
                // 수정할 태그들 userAndTags 테이블에 데이터 생성
                await UserModel.bulkCreateTags({ newTags, transaction });
            }

            await transaction.commit();

            return {
                message: '회원 정보가 수정되었습니다.',
                updatedUser: {
                    nickname: updatedUser.nickname,
                    job: updatedUser.job,
                    region: updatedUser.region,
                    profileImage: updatedUser.profile_image,
                    mbti: updatedUser.mbti,
                    religion: updatedUser.religion,
                    height: updatedUser.height,
                    hobby,
                    personality,
                    ideal,
                    introduce: updatedUser.introduce,
                },
            };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
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
            if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('회원 탈퇴하는 데 실패했습니다.');
            }
        }
    },
};

export { userService };
