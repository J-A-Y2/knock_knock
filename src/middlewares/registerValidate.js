import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const RegisterValidationRules = [
    body('email').notEmpty().withMessage('이메일을 입력하세요.').isEmail().withMessage('유효한 이메일을 입력하세요.'),
    body('userPassword')
        .notEmpty()
        .withMessage('비밀번호를 입력하세요.')
        .isLength({ min: 8 })
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)
        .withMessage('비밀번호는 숫자와 특수 기호를 포함하여 최소 8글자 이상이어야 합니다.'),
    body('nickname').notEmpty().withMessage('닉네임을 입력하세요.'),
    body('username').notEmpty().withMessage('이름을 입력하세요.'),
    body('gender')
        .notEmpty()
        .withMessage('성별을 입력하세요.')
        .isIn(['남', '여'])
        .withMessage('남 또는 여 중 하나를 입력하세요.'),
    body('birthday')
        .notEmpty()
        .withMessage('생년월일을 입력하세요.')
        .matches(/^\d{4}\d{2}\d{2}$/)
        .withMessage('올바른 생년월일 형식(YYYYMMDD)을 입력하세요.'),
    body('job').notEmpty().withMessage('직업을 입력하세요.'),
    // body('imageUrl').notEmpty().withMessage('imageUrl을 확인하세요.'),
];

const registerValidate = (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors.length > 0) {
        throw new BadRequestError(errors[0].msg);
    }
    next();
};

export { RegisterValidationRules, registerValidate };
