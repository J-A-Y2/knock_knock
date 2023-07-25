import { statusCode } from '../utils/statusCode.js';
import { participantService } from '../services/participantService.js';
const participantController = {
    participatePost: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const { message, participationFlag } = await participantService.participatePost({ userId, postId });

            statusCode.setResponseCode201(res);
            res.send({ message, participationFlag });
        } catch (error) {
            next(error);
        }
    },
    participateCancel: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const { message, canceled } = await participantService.participateCancel({ userId, postId });

            statusCode.setResponseCode201(res);
            res.send({ message, participationFlag: canceled });
        } catch (error) {
            next(error);
        }
    },
    getParticipants: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;
            const cursor = parseInt(req.query.cursor);
            const limit = parseInt(req.query.limit);

            const { participantsList, message, ideal, isFulled, nextCursor } = await participantService.getParticipants({
                userId,
                postId,
                cursor,
                limit,
            });

            statusCode.setResponseCode200(res);
            res.send({
                message,
                ideal,
                isFulled,
                participantsList,
                nextCursor,
            });
        } catch (error) {
            next(error);
        }
    },
    allow: async (req, res, next) => {
        try {
            const participantId = req.params.participantId;
            const userId = req.currentUserId;

            const participant = await participantService.allow({ participantId, userId });

            statusCode.setResponseCode200(res);
            res.send({
                message: participant.message,
                totalM: participant.totalM,
                totalF: participant.totalF,
                recruitedM: participant.recruitedM,
                recruitedF: participant.recruitedF,
            });
        } catch (error) {
            next(error);
        }
    },
    deny: async (req, res, next) => {
        try {
            const participantId = req.params.participantId;
            const userId = req.currentUserId;
            const participant = await participantService.deny({ participantId, userId });

            statusCode.setResponseCode200(res);
            res.send({ message: participant.message });
        } catch (error) {
            next(error);
        }
    },
    getAcceptedUsers: async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const postId = req.params.postId;

            const { message, acceptedUsers } = await participantService.getAcceptedUsers({ userId, postId });

            statusCode.setResponseCode200(res);
            res.send({ message, acceptedUsers });
        } catch (error) {
            next(error);
        }
    },
};
export { participantController };
