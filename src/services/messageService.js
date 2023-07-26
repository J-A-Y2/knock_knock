import { MessageModel } from '../db/models/MessageModel.js';
import { ConflictError, InternalServerError } from '../middlewares/errorMiddleware.js';

const messageService = {
    //메세지 생성
    createMessage: async ({ userId, chatId, content }) => {
        try {
            await MessageModel.createMessage({ userId, chatId, content });
            return {
                message: '새로운 메세지 생성에 성공했습니다.',
            };
        } catch (error) {
            throw new InternalServerError('새로운 메세지 생성에 실패했습니다.');
        }
    },

    //모든 메세지 불러오기
    getListChats: async chatId => {
        try {
            await MessageModel.getAllMessage(chatId);

            return {
                message: '유저의 메세지 불러오기에 성공했습니다.',
            };
        } catch (error) {
            throw new InternalServerError('유저의 메세지 불러오기에 실패 했습니다.');
        }
    },
};

export { messageService };
