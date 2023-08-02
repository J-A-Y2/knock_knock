import { ChatModel } from '../db/models/ChatModel.js';
import { ConflictError, InternalServerError } from '../middlewares/errorMiddleware.js';

const chatService = {
    //채팅방 생성
    createChat: async ({ userId, anotherId }) => {
        try {
            const chat = await ChatModel.checkExistingChatRoom({ userId, anotherId });

            if (chat) {
                throw new ConflictError('이미 존재하는 채팅 입니다.');
            }

            await ChatModel.create({ userId, anotherId });

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

    //유저의 채팅 리스트 불러오기
    getListChats: async userId => {
        try {
            const allChatList = await ChatModel.getUserChats(userId);

            return {
                allChatList,
                message: '유저의 채팅 목록 불러오기에 성공했습니다.',
            };
        } catch (error) {
            throw new InternalServerError('유저의 채팅 목록 불러오기에 실패 했습니다.');
        }
    },

    // 유저의 채팅 불러오기
    getChat: async ({ userId, anotherId }) => {
        try {
            let currentUserInfo = [];
            const currentUserId = userId;

            const chatRoom = await ChatModel.findChatRoom({ userId, anotherId });

            if (currentUserId == chatRoom.firstId) {
                currentUserInfo = { sender: chatRoom.firstId, reciever: chatRoom.secondId, chatId: chatRoom.chatId };
            } else {
                currentUserInfo = { sender: chatRoom.secondId, reciever: chatRoom.firstId, chatId: chatRoom.chatId };
            }

            return {
                chatRoom,
                currentUserInfo,
                message: '유저의 채팅 불러오기에 성공했습니다.',
            };
        } catch (error) {
            throw new InternalServerError('유저의 채팅 불러오기에 실패 했습니다.');
        }
    },
};

export { chatService };
