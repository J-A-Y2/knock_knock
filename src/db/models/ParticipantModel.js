import { db } from '../index.js';

const ParticipantModel = {
    participatePost: async ({ userId, postId }) => {
        const createParticipant = await db.Participant.create({ user_id: userId, post_id: postId });
        return createParticipant;
    },
    // 현재 유저가 postId에 해당하는 모임에 참여한 적이 있는지 검증
    getParticipationByUserId: async ({ userId, postId }) => {
        const { count } = await db.Participant.findAndCountAll({
            where: { user_id: userId, post_id: postId },
        });
        return count;
    },
};

export { ParticipantModel };
