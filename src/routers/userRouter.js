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

// 로그인 확인
userRouter.use(loginRequired);

// 로그인 검증
userRouter.get('/isLogin', userController.isLogin);

// 현재 로그인한 유저 정보 불러오기
userRouter.get('/mypage', userController.getCurrentUserInfo);

// 현재 로그인한 유저가 작성한 게시글 모두 불러오기
userRouter.get('/mypage/posts', userController.getCurrentUserPosts);

// 현재 로그인한 유저의 참여한 게시글 모두 불러오기
userRouter.get('/mypage/participants', userController.getCurrentUserParticipants);

// 오늘의 낙낙(네트워크)페이지 - 랜덤으로 6명 유저 정보 불러오기
userRouter.get('/network', userController.getRandomUsersInfo);

// 오늘의 낙낙 랜덤 유저의 마이페이지 불러오기
userRouter.get('/yourpage/:userId', userController.getRandomUserPage);

// 유저 정보 불러오기
userRouter.get('/:userId', userController.getOtherUserInfo);

// 유저 정보 수정하기(별명, 설명)
userRouter.put('/mypage', userController.update);

// 유저 정보 삭제하기
userRouter.delete('/mypage', userController.delete);

export { userRouter };
