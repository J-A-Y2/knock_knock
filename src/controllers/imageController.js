import { imageService } from '../services/userService.js';
import { statusCode } from '../utils/statusCode.js';

const imageController = {
    getImageUrl: async (req, res, next) => {
        try {
            const imageURL = req.file.location;

            statusCode.setResponseCode201(res);
            return res.send(imageURL);
        } catch (error) {
            next(error);
        }
    },
};

export { imageController };
