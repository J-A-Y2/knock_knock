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
postRouter.post("/");

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
postRouter.get("/");

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
postRouter.get("/:postId");

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
postRouter.put("/:postId");

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
postRouter.delete("/:postId");

/**
 * @swagger
 *  /posts/:postId/participants:
 *    post:
 *      tags:
 *      - post
 *      description: 모임 신청하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 신청성공
 */

// 참여 신청
postRouter.post("/:postId/participants");

/**
 * @swagger
 *  /posts/:postId/userList:
 *    get:
 *      tags:
 *      - post
 *      description: 신청자 확인하기
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 신청자 확인 성공
 */

// 신청자 조회
postRouter.get("/:postId/userList");

/**
 * @swagger
 *  /posts/:postId/allow:
 *    post:
 *      tags:
 *      - post
 *      description: 신청 수락
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 신청 수락 성공
 */

// 신청 수락
postRouter.post("/:postId/allow");

/**
 * @swagger
 *  /posts/:postId/delete:
 *    delete:
 *      tags:
 *      - post
 *      description: 신청 거절
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          required: false
 *      responses:
 *       200:
 *        description: 신청 거절 성공
 */

// 신청 거절
postRouter.delete("/:postId/delete");

// 포스트 테이블 -> 포스트의 id -> 신청하기
// -> 누른 유저의 id 이것을 테이블 저장해 -> 신청인원 리스트 테이블 -> 수락
// -> 모집 테이블 -> 모집인원 = 유저수 -> 모집완료 반환( true or false)

// 신청(전체 인원) 테이블 -> 수락 or 거절 -> 거절이면 신청 테이블에서 삭제
// 모집(완료) 테이블 -> 수락누른사람 여기에 쌓여 -> 모집인원 = 유저수 -> 모집완료 (true or false)
