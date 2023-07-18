import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { loginValidate, loginValidationRules } from '../middlewares/loginValidate.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { RegisterValidationRules, registerValidate } from '../middlewares/registerValidate.js';

const userRouter = Router();

// 회원가입
userRouter.post('/register', RegisterValidationRules, registerValidate, userController.register);

// 로그인
userRouter.post('/login', loginValidationRules, loginValidate, userController.login);

// 로그인 검증
userRouter.get('/isLogin', loginRequired, userController.isLogin);

// 네트워크페이지 - 유저 정보 불러오기
userRouter.get('/users');

// 유저 정보 불러오기
userRouter.get('/:userId');

// 유저 정보 수정하기(별명, 설명)
userRouter.put('/:userId');

// 유저 정보 삭제하기
userRouter.delete('/:userId');

export { userRouter };
