import { MessageModel } from '../db/models/MessageModel.js';
import { ConflictError, InternalServerError } from '../middlewares/errorMiddleware';

const messageService = {
    createChat: async ({ userId, anotherId }) => {
        try {
            const chat = await MessageModel.getMembers({ userId, anotherId });

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
};

export { messageService };
