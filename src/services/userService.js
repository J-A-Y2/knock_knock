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
import { FileModel } from '../db/models/FileModel.js';
import { db } from '../db/index.js';
import { calculateKoreanAge } from '../utils/calculateKoreanAge.js';
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
            const hashedPassword = await bcrypt.hash(userInfo.password, parseInt(process.env.PW_HASH_COUNT));
            userInfo.password = hashedPassword;

            userInfo.age = calculateKoreanAge(userInfo.birthday); // birthday로 한국 나이 계산하기

            const createdUser = await UserModel.create(userInfo); // profileImage: URL
            console.log('유저 서비스 userInfo.profile_image: ', userInfo.profileImage);

            // 유저의 프로필 이미지를 이미지 테이블에 저장
            if (userInfo.profileImage) {
                await UserModel.createProfileImage(userInfo.profileImage, createdUser.userId, transaction);
            }

            const TagsCreate = async (tag, tagCategoryId) => {
                // 태그 생성
                if (tag && tag.length > 0) {
                    // 태그이름 배열을 태그아이디(정수) 배열로 변경, [(tagId,userId)] 형태로 변경
                    const newTags = await Promise.all(
                        tag.map(async TagName => {
                            const tagId = await UserModel.findTagId(TagName, tagCategoryId);
                            return { tagId: tagId.tagId, userId: createdUser.userId };
                        }),
                    );
                    // userTags 테이블에 데이터 생성
                    await UserModel.bulkCreateTags({ newTags, transaction });
                }
            };

            await TagsCreate(hobby, 1);
            await TagsCreate(personality, 2);
            await TagsCreate(ideal, 3);

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

            const correctPasswordHash = user.password;
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
        try {
            const user = await UserModel.findById(userId);

            if (!user) {
                throw new NotFoundError('회원 정보를 찾을 수 없습니다.');
            }

            let hobby = [];
            let personality = [];
            let ideal = [];
            for (const userTag of user.UserTags) {
                if (userTag.Tag.tagCategoryId === 1) {
                    hobby.push(userTag.Tag.tagName);
                } else if (userTag.Tag.tagCategoryId === 2) {
                    personality.push(userTag.Tag.tagName);
                } else {
                    ideal.push(userTag.Tag.tagName);
                }
            }

            return {
                message: '회원 정보 조회를 성공했습니다.',
                // user,
                userId: user.userId,
                email: user.email,
                name: user.name,
                nickname: user.nickname,
                gender: user.gender,
                birthday: user.birthday,
                age: user.age,
                job: user.job,
                region: user.region,
                profileImage: user.profileImage,
                mbti: user.mbti,
                height: user.height,
                introduce: user.introduce,
                hobby,
                personality,
                ideal,
            };
        } catch (error) {
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
    // 내가 작성한 게시글 불러오기
    getMyPosts: async ({ userId }) => {
        try {
            const posts = await UserModel.findMyPosts(userId);

            if (!posts) {
                throw new NotFoundError('내가 작성한 게시글을 찾을 수 없습니다.');
            }

            return {
                message: '내가 작성한 게시글 조회 성공!',
                posts,
            };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('내가 작성한 게시글을 불러오기 실패했습니다.');
            }
        }
    },
    // 내가 참여한 게시글 불러오기
    getMyParticipants: async ({ userId }) => {
        try {
            const participants = await UserModel.findMyParticipants(userId);

            if (!participants) {
                throw new NotFoundError('내가 참여한 게시글을 찾을 수 없습니다.');
            }

            return {
                message: '내가 참여한 게시글 조회 성공!',
                participants,
            };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('내가 참여한 게시글을 불러오기 실패했습니다.');
            }
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

            if (updateData.profileImage) {
                await FileModel.updateImageURL();
            }

            if (updateData.backgroundImage) {
                await FileModel.updateImageURL();
            }

            await UserModel.update({ userId, updateData });

            const TagsUpdate = async (tag, tagCategoryId) => {
                // 태그 수정
                if (tag && tag.length > 0) {
                    // 태그 카테고리와 일치하는 태그들 삭제
                    await UserModel.deleteTags(user.userId, tagCategoryId);
                    // 태그이름 배열을 태그아이디(정수) 배열로 변경, [(tagId,userId)] 형태로 변경
                    const newTags = await Promise.all(
                        tag.map(async TagName => {
                            const tagId = await UserModel.findTagId(TagName, tagCategoryId);
                            return { tagId: tagId.tagId, userId: user.userId };
                        }),
                    );
                    // 수정할 태그들 userTags 테이블에 데이터 생성
                    await UserModel.bulkCreateTags({ newTags, transaction });
                }
            };

            await TagsUpdate(hobby, 1);
            await TagsUpdate(personality, 2);
            await TagsUpdate(ideal, 3);
            await transaction.commit();

            return {
                message: '회원 정보가 수정되었습니다.',
                updatedUser: {
                    nickname: user.nickname,
                    age: user.age,
                    job: user.job,
                    region: user.region,
                    profileImage: user.profileImage,
                    mbti: user.mbti,
                    height: user.height,
                    hobby,
                    personality,
                    ideal,
                    introduce: user.introduce,
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
