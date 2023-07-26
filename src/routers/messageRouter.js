import { Router } from 'express';
import { messageController } from '../controllers/messageController.js';

const messageRouter = Router();

// 메세지 작성
messageRouter.post('/', messageController.createMessage);

// 전체 메세지 조회
messageRouter.get('/:chatId', messageController.getMessage);

export { messageRouter };
