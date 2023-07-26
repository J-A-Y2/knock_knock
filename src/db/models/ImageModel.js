import { db } from '../index.js';
const ImageModel = {
    // 이미지 저장
    createImageURL: async (imageUrl, userId, imageCategoryName) => {
        const image = await db.ImageCategory.findOne({
            where: {
                image_category_name: imageCategoryName,
            },
        });
        return await db.Image.create({
            image_url: imageUrl,
            user_id: userId,
            image_category_id: image.image_category_id,
        });
    },
    // 이미지 수정
    updateImageURL: async (imageUrl, userId, imageCategoryName) => {
        const image = await db.ImageCategory.findOne({
            where: {
                user_id: userId,
                image_category_name: imageCategoryName,
            },
        });
        if (!image) {
            await this.createImageURL(imageUrl, userId, imageCategoryName);
        }
        await db.Image.update(imageUrl, {
            where: {
                user_id: userId,
                image_category_id: image.image_category_id,
            },
        });
    },
    // 이미지 조회
    findImage: async (userId, imageCategoryId) => {
        return await db.Image.findOne({
            user_id: userId,
            image_category_id: imageCategoryId,
        });
    },
};

export { ImageModel };
