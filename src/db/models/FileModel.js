import { logger } from '../../utils/logger.js';
import { db } from '../index.js';

const FileModel = {
    // 이미지 저장
    createUserImage: async (category, url, extension, userId, transaction) => {
        const newFile = await db.File.create({ category, url, extension }, { transaction });
        await db.UserFile.create({ userId, fileId: newFile.fileId }, { transaction });
    },
    // 이미지 조회
    getUserImage: async userId => {
        try {
            return await db.UserFile.findAll({
                where: {
                    userId,
                },
                include: [
                    {
                        model: db.File,
                    },
                ],
            });
        } catch (error) {
            console.error(error);
        }
    },
    // 이미지 수정
    updateUserImage: async (fileId, category, url, extension, transaction) => {
        try {
            await db.File.upsert({ fileId, category, url, extension }, { where: { category, fileId }, transaction });
        } catch (error) {
            console.error(error);
        }
    },
    // 유저의 fileIds 조회
    findFileIds: async userId => {
        return await db.UserFile.findAll({
            where: {
                userId,
            },
        });
    },
    // 유저의 files 테이블 조회
    findByFileId: async fileId => {
        const files = await db.File.findOne({
            where: {
                fileId,
            },
        });
        return files;
    },
    createPostImage: async (category, url, extension, postId, transaction) => {
        const file = await db.File.create({ category, url, extension }, { transaction });
        await db.PostFile.create({ postId, fileId: file.fileId }, { transaction });
    },
    updatePostImage: async (category, url, extension, postId, transaction) => {
        const file = await db.PostFile.findOne({ where: { postId } });
        await db.File.update({ category, url, extension }, { where: { fileId: file.fileId }, transaction });
    },
};

export { FileModel };
