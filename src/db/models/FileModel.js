import { db } from '../index.js';
const FileModel = {
    // 이미지 저장
    createImageURL: async (imageUrl, userId, imageCategoryName) => {
        const image = await db.ImageCategory.findOne({
            where: {
                imageCategoryName,
            },
        });
        return await db.Image.create({
            imageUrl,
            userId,
            imageCategoryId: image.imageCategoryId,
        });
    },
    // 이미지 조회
    findImage: async (userId, imageCategoryId) => {
        return await db.Image.findOne({
            userId,
            imageCategoryId,
        });
    },
    // 이미지 수정
    updateImageURL: async (imageUrl, userId, imageCategoryName) => {
        const image = await db.ImageCategory.findOne({
            where: {
                userId,
                imageCategoryName,
            },
        });
        if (!image) {
            await this.createImageURL(imageUrl, userId, imageCategoryName);
        }
        await db.Image.update(imageUrl, {
            where: {
                userId,
                imageCategoryId: image.imageCategoryId,
            },
        });
    },
};

export { FileModel };
