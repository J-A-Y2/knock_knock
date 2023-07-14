import { Router } from "express";

const messageRouter = Router();

/**
 * @swagger
 *  /post:
 *    post:
 *      tags:
 *      - message
 *      description: 쪽지 작성하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 쪽지 작성 성공
 */

// 게시글 작성
messageRouter.post("/post");