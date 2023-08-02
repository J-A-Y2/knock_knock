import { chatService } from '../services/chatService.js';
import { statusCode } from '../utils/statusCode.js';

const chatController = {
    createChat: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const { anotherId } = req.body;

            const createChat = await chatService.createChat({ userId, anotherId });

            statusCode.setResponseCode201(res);
            return res.send({ message: createChat.message });
        } catch (error) {
            next(error);
        }
    },

    getUserChats: async (req, res, next) => {
        try {
            const userId = req.currentUserId;

            const { allChatList, message } = await chatService.getListChats(userId);

            statusCode.setResponseCode200(res);
            return res.send({ allChatList, message });
        } catch (error) {
            next(error);
        }
    },

    getChat: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const anotherId = req.params.secondId;

            const { chatRoom, currentUserInfo, message } = await chatService.getChat({ userId, anotherId });

            statusCode.setResponseCode200(res);
            return res.send({ chatRoom, currentUserInfo, message });
        } catch (error) {
            next(error);
        }
    },
};

export { chatController };
