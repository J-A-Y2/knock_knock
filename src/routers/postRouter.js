import { Router } from "express";

const postRouter = Router();

// 게시글 작성
postRouter.post("/");

// 전체 게시글 시간순 조회
postRouter.get("/");

// 게시글 개별 조회
postRouter.get("/:postId");

// 게시글 수정
postRouter.put("/:postId");

// 게시글 삭제
postRouter.delete("/:postId");

// 참여 신청
postRouter.post("/:postId/participants");

// 신청자 조회
postRouter.get("/:postId/userList");

// 신청 수락
postRouter.post("/:postId/allow");

// 신청 거절
postRouter.delete("/:postId/delete");

// 포스트 테이블 -> 포스트의 id -> 신청하기
// -> 누른 유저의 id 이것을 테이블 저장해 -> 신청인원 리스트 테이블 -> 수락
// -> 모집 테이블 -> 모집인원 = 유저수 -> 모집완료 반환( true or false)

// 신청(전체 인원) 테이블 -> 수락 or 거절 -> 거절이면 신청 테이블에서 삭제
// 모집(완료) 테이블 -> 수락누른사람 여기에 쌓여 -> 모집인원 = 유저수 -> 모집완료 (true or false)
