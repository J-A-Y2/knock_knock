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
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 유저 회원가입 성공
 */

// 회원가입
userRouter.post("/register");

/**
 * @swagger
 *  /login:
 *    post:
 *      tags:
 *      - user
 *      description: 로그인 하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 유저 로그인 성공
 */

// 로그인
userRouter.post("/login");

/**
 * @swagger
 *  /isLogin:
 *    get:
 *      tags:
 *      - user
 *      description: 로그인 검증하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: category
 *          required: false
 *      responses:
 *       200:
 *        description: 로그인 검증 성공
 */

// 로그인 검증
userRouter.get("/isLogin");

/**
 * @swagger
 *  /userCount:
 *    get:
 *      tags:
 *      - user
 *      description: 전체 유저 수 불러오기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: category
 *          required: false
 *      responses:
 *       200:
 *        description: 전체 유저 수 불러오기 성공
 */

//전체 유저 수 불러오기
userRouter.get("/userCount");

/**
 * @swagger
 *  /:userId:
 *    get:
 *      tags:
 *      - user
 *      description: 유저 정보 불러오기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: category
 *          required: false
 *      responses:
 *       200:
 *        description: 유저 정보 불러오기 성공
 */

// 유저 정보 불러오기
userRouter.get("/:userId");

/**
 * @swagger
 *  /:userId:
 *    put:
 *      tags:
 *      - user
 *      description: 유저 정보 수정하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: category
 *          required: false
 *      responses:
 *       200:
 *        description: 유저 회원가입 성공
 */

// 유저 정보 수정하기(별명, 설명)
userRouter.put("/:userId");

/**
 * @swagger
 *  /:userId:
 *    delete:
 *      tags:
 *      - user
 *      description: 유저 정보 삭제하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: category
 *          required: false
 *      responses:
 *       200:
 *        description: 유저 정보 삭제 성공
 */

// 유저 정보 삭제하기
userRouter.delete("/:userId");

export { userRouter };
