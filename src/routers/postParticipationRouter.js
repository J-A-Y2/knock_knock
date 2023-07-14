import { Router } from "express";

const postParticipationRouter = Router();

/**
 * @swagger
 *  /post:
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
postParticipationRouter.post("/post");