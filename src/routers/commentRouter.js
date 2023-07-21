import { Router } from 'express';
import { commentController } from '../controllers/commentController.js';
import { addCommentValidationRules, addComment_validate } from '../middlewares/commentVaildate.js';
import { updateCommentValidationRules, updateComment_validate } from '../middlewares/setComment_validate.js';
import { commentParams_validate } from '../middlewares/commentParams_validate.js';
import { getComment_validate } from '../middlewares/getComment_validate.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const commentRouter = Router();
commentRouter.use(loginRequired);

// 댓글 작성
commentRouter.post('/:postId', addCommentValidationRules, addComment_validate, commentController.create);

//댓글 수정
commentRouter.put('/:postId/:commentId', updateCommentValidationRules, updateComment_validate, commentController.update);

// 개별 게시글 댓글 조회
commentRouter.get('/', getComment_validate, commentController.getComment);

// 댓글 삭제
commentRouter.delete('/:commentId', commentParams_validate, commentController.delete);

export { commentRouter };
