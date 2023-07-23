import { db } from '../index.js';

const MessageModel = {
    create: async ({ userId, anotherId }) => {
        const createChat = await db.ChatRoom.create({ first_id: userId, second_id: anotherId });
        return createChat;
    },

    findChatRooms: async ({ userId, anotherId }) => {
        const findChatRooms = await db.ChatRoom.findOne({ first_id: userId, second_id: anotherId });
        return findChatRooms;
    },

    getUserChat: async userId => {
        const getUserChat = await db.ChatRoom.findOne({
            where: {
                first_id: userId,
            },
        });
        return getUserChat;
    },
};

export { MessageModel };
