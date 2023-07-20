import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { participantController } from '../controllers/participantController.js';
import { postParamsValidate } from '../middlewares/postParamsValidate.js';
const participantRouter = Router();
participantRouter.use(loginRequired);

// 참여 신청
participantRouter.post('/:postId/participants', postParamsValidate, participantController.participatePost);

// 참여 신청 취소
participantRouter.put('/:postId/participants', postParamsValidate, participantController.participateCancel);

// 신청자 조회
participantRouter.get('/:postId/userlist', postParamsValidate, participantController.getParticipants);

// 신청 수락
participantRouter.post('/:postId/:participantId/allow', postParamsValidate, participantController.allow);

// 신청 거절
participantRouter.delete('/:postId/:participantId/deny', postParamsValidate);

// 수락된 유저 조회
participantRouter.get('/:postId/done', postParamsValidate);

export { participantRouter };
