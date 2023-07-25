import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { loginValidate, loginValidationRules } from '../middlewares/loginValidate.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const imageRouter = Router();

// S3에 이미지 업로드
imageRouter.post('/');
export { imageRouter };
