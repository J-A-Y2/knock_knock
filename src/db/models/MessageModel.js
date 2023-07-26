import { db } from '../index.js';

const MessageModel = {
    createMessage: async ({ userId, chatId, content }) => {
        const createMessage = await db.Message.create({ sender_id: userId, chat_id: chatId, message_content: content });

        return createMessage;
    },

    getAllMessage: async chatId => {
        const getAllMessage = await db.Message.findOne({
            where: {
                chat_id: chatId,
            },
        });
        return getAllMessage;
    },
};

export { MessageModel };
