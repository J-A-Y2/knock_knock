import { Router } from "express";

const userRouter = Router();

/**
 * @swagger
 *  /register:
 *    post:
 *      tags:
 *      - user
 *      description: 회원가입 하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: category
 *          required: false
 *          schema:
 *            type: integer
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 유저 회원가입 성공
 */
// 회원가입
userRouter.post(
  "/register",
  RegisterValidationRules,
  register_validate,
  userAuthController.register
);

// 로그인
userRouter.post("/login", loginVas, login_validate, userAuthController.login);
lidationRule;
// 로그인 검증
userRouter.get("/isLogin", login_required, userAuthController.isLogin);

// 유저 실적 보여주기
userRouter.get("/point", login_required, userAuthController.getPoint);

//전체 유저 수 불러오기
userRouter.get("/userCount", login_required, userAuthController.getCount);

// 유저 정보 불러오기
userRouter.get(
  "/:userId",
  login_required,
  userParams_validate,
  userAuthController.getInfo
);

// 유저 정보 수정하기(별명, 설명)
userRouter.put(
  "/:userId",
  login_required,
  upload.single("image"),
  SetUserValidationRules,
  setUser_validate,
  userAuthController.setInfo
);

// 유저 정보 삭제하기
userRouter.delete(
  "/:userId",
  login_required,
  userParams_validate,
  userAuthController.delInfo
);

export { userRouter };
