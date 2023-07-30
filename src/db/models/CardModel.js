import { db } from '../index.js';

const CardModel = {
    //  모든 카드 내용, 이미지 조회
    getAllCards: async () => {
        return await db.Card.findAll({
            include: [
                {
                    model: db.CardFile,
                    attributes: ['fileId'],
                    include: [
                        {
                            model: db.File,
                            attributes: ['url'],
                            where: {
                                category: 'card',
                            },
                        },
                    ],
                },
            ],
        });
    },
    // 카드 개별 조회
    getCardById: async cardId => {
        return await db.Card.findOne({
            where: { cardId },
            include: [
                {
                    model: db.CardFile,
                    attributes: ['fileId'],
                    include: [{ model: db.File, attribures: ['url'], where: { category: 'card' } }],
                },
            ],
        });
    },
    // 카드 같은 유저 랜덤 조회
    findRandomLovers: async (gender, cardId, limit) => {
        await db.UserCard.findAll({
            where: { cardId },
            include: [
                {
                    model: db.User,
                    where: { gender },
                },
            ],
            order: db.sequelize.random(),
            limit,
        });
    },

    // 유저가 뽑은 카드 저장
    saveCard: async ({ userId, cardId }) => {
        return await db.UserCard.upsert({ userId, cardId });
    },
};

export { CardModel };
