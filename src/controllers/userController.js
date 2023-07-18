import { userService } from '../services/userService.js';
import { statusCode } from '../utils/statusCode.js';

const userController = {
    register: async function (req, res, next) {
        try {
            const { username, email, userPassword, nickname, gender, birthday, job } = req.body;

            const createUser = await userService.createUser({
                newUser: { username, email, userPassword, nickname, gender, birthday, job },
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
};

export { userController };
