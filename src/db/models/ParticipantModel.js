import { db } from '../index.js';

const ParticipantModel = {
    // 참가 신청
    participatePost: async ({ transaction, userId, postId, status }) => {
        const createParticipant = await db.Participant.create({ userId, postId, status }, { transaction });
        return createParticipant;
    },

    // 참가 신청자 리스트
    getParticipants: async postId => {
        const { rows: participants } = await db.Participant.findAndCountAll({
            attributes: ['participantId', 'canceled', 'status'],
            where: { postId, canceled: 0 },
            include: [
                {
                    model: db.User,
                    attributes: ['userId', 'nickname', 'gender', 'age', 'job'],
                    include: [
                        {
                            model: db.UserTag,
                            attributes: ['userId'],
                            include: [{ model: db.Tag, attributes: ['tagName'], where: { tagCategoryId: 2 } }],
                        },
                    ],
                },
            ],
        });
        return participants;
    },

    // 현재 유저가 참가 신청한 모임 추출
    getParticipationByUserId: async ({ userId, postId }) => {
        const participation = await db.Participant.findOne({
            where: { userId, postId },
        });
        return participation;
    },

    // participantId로 참가 신청 정보 조회
    getParticipationById: async participantId => {
        const participation = await db.Participant.findOne({
            where: { participantId },
            include: [
                {
                    model: db.Post,
                    attributes: ['postId', 'userId', 'recruitedM', 'recruitedF', 'totalM', 'totalF'],
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
                where: { participantId },
                transaction,
            },
        );
    },
    getAcceptedUsers: async postId => {
        const acceptedUsers = await db.Participant.findAll({
            attributes: [],
            where: {
                postId,
                status: 'accepted',
            },
            include: [
                {
                    model: db.User,
                    attributes: ['nickname', 'gender', 'age', 'job'],
                },
            ],
        });
        return acceptedUsers;
    },
};

export { ParticipantModel };
