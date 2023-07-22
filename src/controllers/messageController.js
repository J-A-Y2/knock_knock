// createChat
//getUserChats
//findChat
import { messageService } from '../services/messageService.js';
import { statusCode } from '../utils/statusCode.js';

const messageController = {
    createChat: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const anotherId = req.body;

            const createChat = await messageService.createChat({ userId, anotherId });

            statusCode.setResponseCode201(res);
            return res.send({ message: createChat.message });
        } catch (error) {
            next(error);
        }
    },

    getUserChats: async (req, res, next) => {
        try {
            const userId = req.currentUserId;

            const getListChats = await messageService.getListChats(userId);

            statusCode.setResponseCode201(res);
            return res.send({ message: getListChats.message });
        } catch (error) {
            next(error);
        }
    },
};

export { messageController };
