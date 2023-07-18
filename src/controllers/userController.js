import { userService } from '../services/userService.js';
import { statusCode } from '../utils/statusCode.js';

const userController = {
    register: async function (req, res, next) {
        try {
            const {
                username,
                email,
                userPassword,
                nickname,
                gender,
                birthday,
                job,
                mbti,
                religion,
                height,
                hobby,
                personality,
                ideal,
                introduce,
            } = req.body;

            const createUser = await userService.createUser({
                newUser: {
                    username,
                    email,
                    userPassword,
                    nickname,
                    gender,
                    birthday,
                    job,
                    mbti,
                    religion,
                    height,
                    hobby,
                    personality,
                    ideal,
                    introduce,
                },
            });
            statusCode.setResponseCode201(res);
            return res.send(createUser.message);
        } catch (error) {
            next(error);
        }
    },

    login: async function (req, res, next) {
        try {
            const { email, password } = req.body;
            const loginUser = await userService.getUser({ email, password });

            statusCode.setResponseCode200(res);

            return res.send({ message: loginUser.message, token: loginUser.token, userId: loginUser.userId });
        } catch (error) {
            next(error);
        }
    },
    isLogin: async function (req, res, next) {
        try {
            const userId = req.currentUserId;
            const checkUser = await userService.loginCheck({ userId });

            statusCode.setResponseCode200(res);
            return res.send({
                message: checkUser.message,
                userId: checkUser.userId,
                email: checkUser.email,
                nickname: checkUser.nickname,
            });
        } catch (error) {
            next(error);
        }
    },
    update: async function (req, res, next) {
        try {
            const { userId } = req.params;
            const updateData = req.body;

            const updatedUser = await userService.updateUser({ userId, updateData });

            statusCode.setResponseCode200(res);
            return res.send({ message: updatedUser.message });
        } catch (error) {
            next(error);
        }
    },
    delete: async function (req, res, next) {
        try {
            const { userId } = req.params;
            console.log('유저컨트롤러에 있는 userId:', userId);
            const deletedUser = await userService.deleteUser({ userId });

            statusCode.setResponseCode200(res);
            return res.send(deletedUser.message);
        } catch (error) {
            next(error);
        }
    },
};

export { userController };
