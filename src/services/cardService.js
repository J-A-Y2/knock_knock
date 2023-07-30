import { CardModel } from '../db/models/CardModel.js';
import { UserModel } from '../db/models/UserModel.js';
import { InternalServerError, NotFoundError } from '../middlewares/errorMiddleware.js';
import { throwNotFoundError } from '../utils/commonFunctions.js';

const cardService = {
    getAllCards: async () => {
        try {
            const cards = await CardModel.getAllCards();
            console.log(cards[0].content.split('/'));
            cards.content.map(card => card.split('/'));
            return {
                message: '카드 불러오기에 성공했습니다.',
                cards,
            };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('카드 불러오기를 실패했습니다.');
            }
        }
    },
    resultCards: async cardId => {
        try {
            const card = await CardModel.getCardById(cardId);
            throwNotFoundError(card, '카드');

            await CardModel.saveCard({ userId, cardId });

            return { message: '유저 카드 정보 저장에 성공했습니다.' };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            } else {
                throw new InternalServerError('유저-카드 정보 저장에 실패했습니다.');
            }
        }
    },
    getRandomLovers: async ({ userId, cardId }) => {
        try {
            const user = await UserModel.findById(userId);
            throwNotFoundError(user, '유저');

            let genderToFind; // 로그인 유저가 남자면 여자를 보여기 그 반대도 마찬가지
            if (user.gender === '남') {
                genderToFind = '여';
            } else {
                genderToFind = '남';
            }

            const randomLovers = await CardModel.findRandomLovers({ cardId, genderToFind, limit: 3 });

            // if (!randomUsers || randomUsers.length === 0) {
            //     throw new NotFoundError('유저들을 찾을 수 없습니다..');
            // }

            return {
                message: '랜덤으로 유저 6명 조회하기 성공!',
                randomUsers,
            };
        } catch (error) {
            throw new BadRequestError('랜덤으로 유저들을 조회하는 데 실패했습니다.');
        }
    },
};

export { cardService };
