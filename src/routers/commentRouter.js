import { Router } from "express";

const commentRouter = Router();

// 댓글 작성
commentRouter.post("/");

//댓글 수정
commentRouter.put("/:commentId");

// 개별 댓글 조회
commentRouter.get("/:postId");

// 댓글 삭제
commentRouter.delete("/:commentId");

export { commentRouter };
