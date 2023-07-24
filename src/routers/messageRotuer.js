import { Router } from 'express';

const messageRouter = Router();

// 쪽지 작성
messageRouter.post('/');

// 전체 쪽지 조회
messageRouter.get('/');

// 개별 쪽지 조회
messageRouter.get('/:messageId');

// 쪽지 삭제
messageRouter.delete('/:messageId');

// 쪽지 확인
messageRouter.get('/isRead');

export { messageRouter };
