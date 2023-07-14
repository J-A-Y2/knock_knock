import { Router } from "express";

const messageRouter = Router();

/**
 * @swagger
 *  /messages:
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

// 쪽지 작성
messageRouter.post("/");

/**
 * @swagger
 *  /messages:
 *    get:
 *      tags:
 *      - message
 *      description: 전체 쪽지 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 전체 쪽지 조회 성공
 */

// 전체 쪽지 조회
messageRouter.get("/");

/**
 * @swagger
 *  /messages/:messageId:
 *    get:
 *      tags:
 *      - message
 *      description: 개별 쪽지 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 개별 쪽지 조회 성공
 */

// 개별 쪽지 조회
messageRouter.get("/:messageId");

/**
 * @swagger
 *  /messages/:messageId:
 *    delete:
 *      tags:
 *      - message
 *      description: 쪽지 삭제하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: headers
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 쪽지 삭제 성공
 */

// 쪽지 삭제
messageRouter.delete("/:messageId");

/**
 * @swagger
 *  /messages/isRead:
 *    get:
 *      tags:
 *      - message
 *      description: 쪽지 읽음 여부 확인
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: headers
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 쪽지 읽음 여부 확인 성공
 */

// 쪽지 확인
messageRouter.get("/isRead");
