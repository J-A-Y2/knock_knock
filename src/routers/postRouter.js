import { Router } from "express";

const postRouter = Router();

/**
 * @swagger
 *  /posts:
 *    post:
 *      tags:
 *      - post
 *      description: 게시글 작성하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 게시글 작성 성공
 */

// 게시글 작성
postRouter.post("/posts");

/**
 * @swagger
 *  /posts:
 *    get:
 *      tags:
 *      - post
 *      description: 전체 게시글 시간순 조회하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 전체게시글 조회 성공
 */

// 전체 게시글 시간순 조회
postRouter.get("/posts");

/**
 * @swagger
 *  /posts/:postId:
 *    get:
 *      tags:
 *      - post
 *      description: postId에 해당하는 게시글 조회하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 게시글 조회 성공
 */

// 게시글 개별 조회
postRouter.get("/posts/:postId");

/**
 * @swagger
 *  /posts/:postId:
 *    put:
 *      tags:
 *      - post
 *      description: 게시글 수정하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 게시글 수정 성공
 */

// 게시글 수정
postRouter.put("/posts/:postId");

/**
 * @swagger
 *  /posts/:postId:
 *    delete:
 *      tags:
 *      - post
 *      description: 게시글 삭제하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 게시글 삭제 성공
 */

// 게시글 삭제
postRouter.delete("/posts/:postId");