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
    updateUserImage: async (category, url, extension, transaction) => {
        try {
            db.File.update({ category, url, extension }, { transaction });
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
        console.log('files', files.category);
        return files;
    },
};

export { FileModel };
