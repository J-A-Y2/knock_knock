import { db } from '../index.js';

const ParticipantModel = {
    // 참가 신청
    participatePost: async ({ transaction, userId, postId, status }) => {
        const createParticipant = await db.Participant.create({ user_id: userId, post_id: postId, status }, { transaction });
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
            attributes: ['participant_id', 'canceled', 'status'],
            where: { post_id: postId, canceled: 0 },
            include: [
                {
                    model: db.User,
                    attributes: ['nickname', 'gender', 'age', 'job', 'profile_image'],
                },
            ],
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

    // participantId로 참가 신청 정보 조회
    getParticipationById: async participantId => {
        const participation = await db.Participant.findOne({
            where: { participant_id: participantId },
            include: [
                {
                    model: db.Post,
                    attributes: ['post_id', 'recruited_m', 'recruited_f', 'total_m', 'total_f'],
                },
                {
                    model: db.User,
                    attributes: ['gender'],
                },
            ],
        });
        return participation;
    },

    // 참가 신청 변경
    update: async ({ transaction, participantId, updateField, newValue }) => {
        await db.Participant.update(
            { [updateField]: newValue },
            {
                where: { participant_id: participantId },
                transaction,
            },
        );
    },
    getAcceptedUsers: async postId => {
        const acceptedUsers = await db.Participant.findAll({
            attributes: [],
            where: {
                post_id: postId,
                status: 'accepted',
            },
            include: [
                {
                    model: db.User,
                    attributes: ['nickname', 'gender', 'age', 'job', 'profile_image'],
                },
            ],
        });
        return acceptedUsers;
    },
};

export { ParticipantModel };
