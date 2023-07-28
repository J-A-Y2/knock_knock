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
                include: [
                    {
                        model: db.File,
                        attributes: ['category', 'url'],
                    },
                ],
            });
        } catch (error) {
            console.error(error);
        }
    },
    // 이미지 수정
    updateUserImage: async (category, url, extension, userId, transaction) => {
        try {
            const userFiles = await db.UserFile.findAll({
                where: { userId },
            });
        } catch (error) {
            console.error(error);
        }
    },
};

export { FileModel };
