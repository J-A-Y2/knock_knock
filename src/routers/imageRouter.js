import { Router } from 'express';
import { upload } from '../utils/upload.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const imageRouter = Router();

// S3에 이미지 업로드
imageRouter.post('/', loginRequired, upload.single('image'), imageController.getImageUrl);

export { imageRouter };
