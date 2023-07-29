import { PostModel } from '../db/models/PostModel.js';
import { UserModel } from '../db/models/UserModel.js';
import { FileModel } from '../db/models/FileModel.js';
import { ParticipantModel } from '../db/models/ParticipantModel.js';
import { db } from '../db/index.js';
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../middlewares/errorMiddleware.js';
import { setRecruitedValue, fieldsToUpdate } from '../utils/postFunctions.js';
import { throwNotFoundError } from '../utils/commonFunctions.js';
import { extensionSplit } from '../utils/extensionSplit.js';
import { logger } from '../utils/logger.js';

const postService = {
    createPost: async ({ userId, newPost }) => {
        const transaction = await db.sequelize.transaction({ autocommit: false });
        try {
            const { postImage, ...postInfo } = newPost;
            const user = await UserModel.findById(userId);

            if (!user) {
                throw new UnauthorizedError('잘못된 토큰입니다.');
            }

            setRecruitedValue(user, postInfo);

            const post = await PostModel.create({ newPost: { transaction, userId, ...postInfo } });

            // 유저의 프로필 이미지를 이미지 테이블에 저장
            if (postImage) {
                const fileExtension = extensionSplit(postImage[1]);
                await FileModel.createPostImage(
                    postImage[0], // category
                    postImage[1], // url
                    fileExtension,
                    post.postId,
                    transaction,
                );
            }

            await ParticipantModel.participatePost({ transaction, userId, postId: post.postId, status: 'accepted' });
            await transaction.commit();

            return { message: '게시물 작성을 성공했습니다.' };
        } catch (error) {
            await transaction.rollback();
            if (error instanceof UnauthorizedError) {
                throw error;
            } else {
                throw new InternalServerError('게시물 작성을 실패했습니다.');
            }
        }
    },
    getAllPosts: async ({ page, perPage, type }) => {
        try {
            const offset = (page - 1) * perPage;
            const limit = perPage;
            if (type) {
                // 카테고리별 게시글 조회
                const { total, posts } = await PostModel.getFilteredPosts({ offset, limit, type });

                return { message: '카테고리별 게시글 조회를 성공했습니다.', total, posts };
            } else {
                // 전체 게시글 조회
                const { total, posts } = await PostModel.getAllPosts({ offset, limit });
                return { message: '게시글 전체 조회를 성공했습니다.', total, posts };
            }
        } catch (error) {
            if (error) {
                throw new InternalServerError('게시물 전체 조회를 실패했습니다.');
            }
        }
    },
    getPost: async postId => {
        try {
            const post = await PostModel.getPostById(postId);
            throwNotFoundError(post, '게시글');
            // const userWithImage = {
            //     nickname: post.User.nickname,
            //     profileImage: post.User.UserFiles[0].File.url,
            // };

            // const postImage = post.PostFiles[0]?.File.url || null;

            return {
                message: '게시글 조회를 성공했습니다.',
                post,
            };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('게시물 조회를 실패했습니다.');
            }
        }
    },
    setPost: async ({ userId, postId, toUpdate }) => {
        const transaction = await db.sequelize.transaction({ autocommit: false });
        try {
            let post = await PostModel.getPostById(postId);
            throwNotFoundError(post, '게시글');

            if (post.userId !== userId) {
                throw new UnauthorizedError('수정 권한이 없습니다.');
            }

            const { postImage, ...updateValue } = toUpdate;

            if (toUpdate.totalM) {
                if (post.recruitedM > toUpdate.totalM) {
                    throw new BadRequestError('현재 모집된 인원보다 적게 수정할 수 없습니다.');
                }
            }
            if (toUpdate.totalF) {
                if (post.recruitedF > toUpdate.totalF) {
                    throw new BadRequestError('현재 모집된 인원보다 적게 수정할 수 없습니다.');
                }
            }

            for (const [field, fieldToUpdate] of Object.entries(fieldsToUpdate)) {
                if (toUpdate[field]) {
                    const newValue = updateValue[field]; //{"title": "수정"}
                    await PostModel.update({ postId, fieldToUpdate, newValue, transaction });
                }
            }

            if (post.PostFiles.length > 0 && postImage) {
                const fileExtension = extensionSplit(postImage[1]);
                await FileModel.updatePostImage(
                    postImage[0], // category
                    postImage[1], // url
                    fileExtension,
                    postId,
                    transaction,
                );
            }
            if (post.PostFiles.length == 0 && postImage) {
                const fileExtension = extensionSplit(postImage[1]);
                await FileModel.createPostImage(
                    postImage[0], // category
                    postImage[1], // url
                    fileExtension,
                    postId,
                    transaction,
                );
            }

            await transaction.commit();
            return { message: '게시글 수정을 성공했습니다.' };
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            if (error instanceof UnauthorizedError || error instanceof NotFoundError || error instanceof BadRequestError) {
                throw error;
            } else {
                throw new InternalServerError('게시글 수정을 실패했습니다.');
            }
        }
    },
    deletePost: async ({ userId, postId }) => {
        try {
            const post = await PostModel.getPostById(postId);

            throwNotFoundError(post, '게시글');

            if (post.userId !== userId) {
                throw new UnauthorizedError('삭제 권한이 없습니다.');
            }

            await PostModel.delete(postId);
            return { message: '게시글 삭제를 성공했습니다.' };
        } catch (error) {
            if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('게시글 삭제를 실패했습니다.');
            }
        }
    },
};

export { postService };
