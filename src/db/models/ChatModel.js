import { db } from '../index.js';

const ChatModel = {
    create: async ({ userId, anotherId }) => {
        const createChat = await db.ChatRoom.create({ first_id: userId, second_id: anotherId });
        return createChat;
    },

    findChatRoom: async ({ userId, anotherId }) => {
        const findChatRoom = await db.ChatRoom.findOne({
            where: {
                first_id: userId,
                second_id: anotherId,
            },
        });
        return findChatRoom;
    },

    getUserChats: async userId => {
        const getUserChats = await db.ChatRoom.findOne({
            where: {
                first_id: userId,
            },
        });
        return getUserChats;
    },
};

export { ChatModel };
