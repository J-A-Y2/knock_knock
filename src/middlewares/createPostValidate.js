import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const allowedPostTypes = ['술', '영화', '식사', '카페', '산책', '드라이브', '공연관람', '기타'];

const createPostValidationRules = [
    body('postTitle')
        .notEmpty()
        .withMessage('제목을 입력하세요.')
        .isLength({ max: 100 })
        .withMessage('게시글 제목은 100자 이내로 작성해주세요.'),
    body('postContent')
        .notEmpty()
        .withMessage('내용을 입력하세요.')
        .isLength({ max: 200 })
        .withMessage('게시글 내용은 200자 이내로 작성해주세요'),
    body('postType')
        .notEmpty()
        .withMessage('모임의 목적을 입력하세요.')
        .custom(value => {
            if (!allowedPostTypes.includes(value)) {
                throw new BadRequestError('유효하지 않은 모임 목적입니다.');
            }
            return true;
        }),
    body('people')
        .notEmpty()
        .withMessage('모임 인원을 입력하세요.')
        .custom(value => {
            if (value > 10) {
                throw new BadRequestError('모임 인원은 10명 이하로 입력해야 합니다.');
            }
            return true;
        }),
    body('place').notEmpty().withMessage('모임 장소를 입력하세요.'),
    body('meetingTime').notEmpty().withMessage('모임 시간을 입력하세요.'),
];

const createPostValidate = (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};

export { createPostValidate, createPostValidationRules };
