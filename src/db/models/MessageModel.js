import { db } from '../index.js';

const MessageModel = {
    create: async ({ userId, anotherId }) => {
        const createChat = await db.Message.create({ members: [userId, anotherId] });
        return createChat;
    },

    getMembers: async ({ userId, anotherId }) => {
        const getMembers = await db.MessageModel.findOne({ members: [userId, anotherId] });
        return getMembers;
    },
};

export { MessageModel };
