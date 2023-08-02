import { db } from '../index.js';
import { Op } from 'sequelize';

const ChatModel = {
    create: async ({ userId, anotherId }) => {
        const createChat = await db.ChatRoom.create({ firstId: userId, secondId: anotherId });
        return createChat;
    },

    findChatRoom: async ({ userId, anotherId }) => {
        const findChatRoom = await db.ChatRoom.findOne({
            where: {
                [Op.or]: [
                    { [Op.and]: [{ firstId: userId }, { secondId: anotherId }] },
                    { [Op.and]: [{ firstId: anotherId }, { secondId: userId }] },
                ],
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

    checkExistingChatRoom: async ({ userId, anotherId }) => {
        const checkExistingChatRoom = await db.ChatRoom.findOne({
            where: {
                [Op.or]: [
                    { [Op.and]: [{ firstId: userId }, { secondId: anotherId }] },
                    { [Op.and]: [{ firstId: anotherId }, { secondId: userId }] },
                ],
            },
            // include: [
            //     {
            //         model: db.User,
            //         attributes: ['nickname'],
            //         include: [
            //             {
            //                 model: db.UserFile,
            //                 attributes: ['fileId'],
            //                 include: [{ model: db.File, where: { category: 'profile' }, attributes: ['url'] }],
            //             },
            //         ],
            //     },
            // ],
        });
        return checkExistingChatRoom;
    },

    getUserChats: async userId => {
        const getUserChats = await db.ChatRoom.findAll({
            where: {
                [Op.or]: [{ firstId: userId }, { secondId: userId }],
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
