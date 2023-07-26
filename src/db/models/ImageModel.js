import { db } from '../index.js';
const ImageModel = {
    // 이미지 저장
    createImageURL: async (ImageURL, userId, imageCategoryName) => {
        const image = await db.ImageCategory.findOne({
            where: {
                image_category_name: imageCategoryName,
            },
        });
        return await db.Image.create({
            image_url: ImageURL,
            user_id: userId,
            image_category_id: image.image_category_id,
        });
    },
    // 이미지 수정
    updateImageURL: async (ImageURL, userId, imageCategoryName) => {
        const image = await db.ImageCategory.findOne({
            where: {
                user_id: userId,
                image_category_name: imageCategoryName,
            },
        });
        if (!image) {
            await this.createImageURL(ImageURL, userId, imageCategoryName);
        }
        await db.Image.update(ImageURL, {
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
