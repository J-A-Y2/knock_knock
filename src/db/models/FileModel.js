import { db } from '../index.js';

const FileModel = {
    // 이미지 저장
    createUserImage: async (category, url, extention, userId, transaction) => {
        console.log('파일모델 변수들:', category, url, extention, userId);
        const file = await db.File.create({ category, url, extention }, { transaction });
        console.log('파일모델 file', file.fileId);
        await db.UserFile.create({ userId, fileId: file.fileId });
    },
};

export { FileModel };
