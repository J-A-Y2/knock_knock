import { Router } from 'express';
import { fileController } from '../controllers/fileController.js';
import { upload } from '../utils/upload.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const fileRouter = Router();

// S3에 이미지 업로드
fileRouter.post('/', loginRequired, upload.single('image'), fileController.getImageUrl);

export { fileRouter };
