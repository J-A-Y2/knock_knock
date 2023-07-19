import { db } from '../index.js';

const ParticipantModel = {
    participatePost: async ({ userId, postId }) => {
        try {
            console.log(userId, postId);
            const createParticipant = await db.Participant.create({ user_id: userId, post_id: postId });
            console.log(createParticipant);
            return createParticipant;
        } catch (e) {
            console.log(e);
        }
    },
};

export { ParticipantModel };
