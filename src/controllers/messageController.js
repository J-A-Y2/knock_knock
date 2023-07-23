// createChat
//getUserChats
//findChat
import { messageService } from '../services/messageService.js';
import { statusCode } from '../utils/statusCode.js';

const messageController = {
    createMessage: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const { chatId, content } = req.body;

            const createMessage = await messageService.createMessage({ userId, chatId, content });

            statusCode.setResponseCode201(res);
            return res.send({ message: createMessage.message });
        } catch (error) {
            next(error);
        }
    },

    getMessage: async (req, res, next) => {
        try {
            const chatId = req.params.chatId;

            const getMessage = await messageService.getMessage(chatId);

            statusCode.setResponseCode201(res);
            return res.send({ message: getMessage.message });
        } catch (error) {
            next(error);
        }
    },
};

export { messageController };
