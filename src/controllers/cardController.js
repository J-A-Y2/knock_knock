import { statusCode } from '../utils/statusCode.js';
import { cardService } from '../services/cardService.js';

const cardController = {
    getAllCards: async (req, res, next) => {
        try {
            const { message, cards } = await cardService.getAllCards();
            statusCode.setResponseCode200(res);
            res.send({ message, cards });
        } catch (error) {
            next(error);
        }
    },

    resultCards: async (req, res, next) => {
        try {
            const cardId = req.query.cardId;

            const resultCards = await cardService.resultCards(cardId);

            statusCode.setResponseCode201(res);
            res.send({ message: resultCards.message });
        } catch (error) {
            next(error);
        }
    },
    getRandomLovers: async (req, res, next) => {
        try {
            const cardId = req.params.cardId;
            const userId = req.params.userId;
            const randomLovers = await cardService.getRandomLovers({ userId, cardId });

            statusCode.setResponseCode200(res);
            res.send();
        } catch (error) {
            next(error);
        }
    },
};

export { cardController };
