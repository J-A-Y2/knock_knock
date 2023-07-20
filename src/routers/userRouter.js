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

// 현재 로그인된 유저 정보 불러오기
userRouter.get('/mypage', loginRequired, userController.getCurrentUserInfo);

// 오늘의 낙낙(네트워크)페이지 - 랜덤으로 6명 유저 정보 불러오기
userRouter.get('/network', loginRequired, userController.getRandomUsersInfo);

// 유저 정보 불러오기
userRouter.get('/:userId', loginRequired, userController.getUserInfo);

// 유저 정보 수정하기(별명, 설명)
userRouter.put('/mypage/update', loginRequired, userController.update);

// 유저 정보 삭제하기
userRouter.delete('/mypage/delete', loginRequired, userController.delete);

export { userRouter };
