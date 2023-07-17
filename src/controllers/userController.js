import { userService } from '../services/userService.js';
import { statusCode } from '../utils/statusCode.js';

class userController {
    static async register(req, res, next) {
        try {
            const { userName, email, userPassword, nickname, gender, birthday, job } = req.body;

            const createUser = await userService.createUser({
                userName,
                email,
                userPassword,
                nickname,
                gender,
                birthday,
                job,
            });

            statusCode.setResponseCode201(res);
            return res.send(createUser.message);
        } catch (error) {
            next(error);
        }
    }
}

export { userController };
