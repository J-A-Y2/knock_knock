import { Router } from 'express';
import { chatController } from '../controllers/chatController.js';

const chatRouter = Router();

// 쪽지 작성
chatRouter.post('/', chatController.createChat);

// 전체 쪽지 조회
chatRouter.get('/', chatController.getUserChats);

// 개별 쪽지 조회
chatRouter.get('/:secondId', chatController.getChat);

// // 쪽지 삭제
// chatRouter.delete('/:messageId');

// // 쪽지 확인
// chatRouter.get('/isRead');

export { chatRouter };
