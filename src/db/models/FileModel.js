import { db } from '../index.js';

const FileModel = {
    // 이미지 저장
    createUserImage: async (category, url, extension, userId, transaction) => {
        const file = await db.File.create({ category, url, extension }, { transaction });
        await db.UserFile.create({ userId, fileId: file.fileId }, { transaction });
    },
    // 이미지 수정
    updateUserImage: async (category, url, extension, userId, transaction) => {
        try {
            const userFiles = await db.UserFile.findAll({
                where: { userId },
            });

            for (const userFile of userFiles) {
                const file = await db.File.findOne({
                    where: { fileId: userFile.fileId },
                });

                if (file.category === 'profile' || file.category === 'background') {
                    // 프로필이나 배경 이미지가 존재하면 수정하기
                    await db.File.update({ category, url, extension }, { where: { fileId: file.fileId }, transaction });
                } else {
                    // 프로필이나 배경 이미지 없으면 생성하기
                    const newFile = await db.File.create({ category, url, extension }, { transaction });
                    await db.UserFile.create({ userId, fileId: newFile.fileId }, { transaction });
                }
            }
        } catch (error) {
            console.error(error);
        }
    },
};

export { FileModel };
