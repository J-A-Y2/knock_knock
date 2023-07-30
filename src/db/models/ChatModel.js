import { db } from '../index.js';

const ChatModel = {
    create: async ({ userId, anotherId }) => {
        console.log({ userId, anotherId });
        const createChat = await db.ChatRoom.create({ firstId: userId, secondId: anotherId });
        return createChat;
    },

    findChatRoom: async ({ userId, anotherId }) => {
        const findChatRoom = await db.ChatRoom.findOne({
            where: {
                firstId: userId,
                secondId: anotherId,
            },
            include: [
                {
                    model: db.User,
                    attributes: ['nickname'],
                    include: [
                        {
                            model: db.UserFile,
                            attributes: ['fileId'],
                            include: [{ model: db.File, where: { category: 'profile' }, attributes: ['url'] }],
                        },
                    ],
                },
            ],
        });
        return findChatRoom;
    },

    getUserChats: async userId => {
        const getUserChats = await db.ChatRoom.findAll({
            where: {
                firstId: userId,
            },
            include: [
                {
                    model: db.User,
                    attributes: ['nickname'],
                    include: [
                        {
                            model: db.UserFile,
                            attributes: ['fileId'],
                            include: [{ model: db.File, where: { category: 'profile' }, attributes: ['url'] }],
                        },
                    ],
                },
            ],
        });
        return getUserChats;
    },

    findChatRoomByChatId: async chatId => {
        const chatRoom = await db.ChatRoom.findOne({ where: { chatId } });
        return chatRoom;
    },
};

export { ChatModel };
