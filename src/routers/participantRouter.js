import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { postParamsValidate } from '../middlewares/postParamsValidate.js';
import { getPostValidate } from '../middlewares/getPostValidate.js';
import { setPostValidationRules, setPostValidate } from '../middlewares/setPostValidate.js';
import { createPostValidate, createPostValidationRules } from '../middlewares/createPostValidate.js';
import { participantController } from '../controllers/participantController.js';

const participantRouter = Router();
participantRouter.use(loginRequired);

// 참여 신청
participantRouter.post('/:postId/participants', participantController.participatePost);

// 신청자 조회
participantRouter.get('/:postId/userlist');

// 신청 수락
participantRouter.post('/:postId/allow');

// 신청 거절
participantRouter.delete('/:postId/delete');

export { participantRouter };
