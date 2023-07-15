import { Router } from "express";

const userRouter = Router();

// 회원가입
userRouter.post("/register");

// 로그인
userRouter.post("/login");

// 로그인 검증
userRouter.get("/isLogin");

// 네트워크페이지 - 유저 정보 불러오기
userRouter.get("/users");

// 유저 정보 불러오기
userRouter.get("/:userId");

// 유저 정보 수정하기(별명, 설명)
userRouter.put("/:userId");

// 유저 정보 삭제하기
userRouter.delete("/:userId");

export { userRouter };
