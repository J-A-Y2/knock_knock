import { userService } from '../services/userService.js';
import { statusCode } from '../utils/statusCode.js';

const userController = {
    register: async (req, res, next) => {
        try {
            const {
                username,
                email,
                userPassword,
                nickname,
                gender,
                birthday,
                job,
                region,
                profileImage,
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
                    region,
                    profileImage,
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

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const loginUser = await userService.getUser({ email, password });

            statusCode.setResponseCode200(res);

            return res.send({ message: loginUser.message, token: loginUser.token, userId: loginUser.userId });
        } catch (error) {
            next(error);
        }
    },
    isLogin: async (req, res, next) => {
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
    getUserInfo: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const getUser = await userService.getUserById({ userId });

            statusCode.setResponseCode200(res);
            return res.send({ getUser });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const userId = req.currentUserId;

            const updateData = req.body;

            const updatedUser = await userService.updateUser({ userId, updateData });

            statusCode.setResponseCode200(res);
            return res.send({ updatedUser });
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const userId = req.currentUserId;

            const deletedUser = await userService.deleteUser({ userId });

            statusCode.setResponseCode200(res);
            return res.send(deletedUser.message);
        } catch (error) {
            next(error);
        }
    },
};

export { userController };
