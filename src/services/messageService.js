import { MessageModel } from '../db/models/MessageModel.js';
import { ConflictError, InternalServerError } from '../middlewares/errorMiddleware';

const messageService = {
    createChat: async ({ userId, anotherId }) => {
        try {
            const chat = await MessageModel.findChatRooms({ userId, anotherId });

            if (chat) {
                throw new ConflictError('이미 존재하는 채팅 입니다.');
            }

            await MessageModel.create({ userId, anotherId });

            return {
                message: '새로운 채팅 방 생성에 성공했습니다.',
            };
        } catch (error) {
            if (error instanceof ConflictError) {
                throw error;
            } else {
                throw new InternalServerError('채팅방 생성에 실패했습니다.');
            }
        }
    },

    getListChats: async userId => {
        try {
            await MessageModel.getUserChat(userId);

            return {
                message: '유저의 채팅 목록 불러오기에 성공했습니다.',
            };
        } catch (error) {
            throw new InternalServerError('유저의 채팅 목록 불러오기에 실패 했습니다.');
        }
    },
};

export { messageService };
