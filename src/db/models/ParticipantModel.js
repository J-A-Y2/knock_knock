import { db } from '../index.js';

const ParticipantModel = {
    // 참가 신청
    participatePost: async ({ userId, postId }) => {
        const createParticipant = await db.Participant.create({ user_id: userId, post_id: postId });
        return createParticipant;
    },

    // 현재 유저가 postId에 해당하는 모임에 참여한 적이 있는지 검증
    countParticipationByUserId: async ({ userId, postId }) => {
        const { count } = await db.Participant.findAndCountAll({
            where: { user_id: userId, post_id: postId },
        });
        return count;
    },

    // 참가 신청자 리스트
    getParticipants: async postId => {
        const { count, rows: participants } = await db.Participant.findAndCountAll({
            where: { post_id: postId, canceled: 0 },
        });
        return { total: count, participants };
    },

    // 현재 유저가 참가 신청한 모임 추출
    getParticipationIdById: async ({ userId, postId }) => {
        const participation = await db.Participant.findOne({
            where: { user_id: userId, post_id: postId },
        });
        return participation;
    },

    // 참가 신청 변경
    participatePut: async ({ participantId, canceledValue }) => {
        await db.Participant.update(
            { [`canceled`]: canceledValue },
            {
                where: { participant_id: participantId },
            },
        );
    },
};

export { ParticipantModel };
