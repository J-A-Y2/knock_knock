import { Op } from 'sequelize';
import { db } from '../index.js';

const ParticipantModel = {
    // 참가 신청
    participatePost: async ({ transaction, userId, postId, matchingCount }) => {
        const createParticipant = await db.Participant.create({ userId, postId, matchingCount }, { transaction });
        return createParticipant;
    },

    // 참가 신청자 리스트
    getParticipants: async postId => {
        const { rows: participants } = await db.Participant.findAndCountAll({
            attributes: ['participantId', 'canceled', 'status', 'matchingCount'],
            where: { postId, canceled: 0, status: 'pending' },
            include: [
                {
                    model: db.User,
                    attributes: ['userId', 'nickname', 'gender', 'age', 'job'],
                    include: [
                        {
                            model: db.UserTag,
                            attributes: ['userId'],
                            include: [
                                {
                                    model: db.Tag,
                                    attributes: ['tagName', 'tagCategoryId'],
                                    where: { tagCategoryId: 2 },
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [['matchingCount', 'DESC']],
        });
        return participants;
    },

    // 참가 신청자 리스트 (커서 O)
    getUpdatedParticipantsByCursor: async ({ postId, cursor, limit }) => {
        const { count, rows: participants } = await db.Participant.findAndCountAll({
            attributes: ['participantId', 'canceled', 'status', 'matchingCount'],
            where: { postId, canceled: 0, status: 'pending', participantId: { [Op.lt]: cursor } },
            limit,
            include: [
                {
                    model: db.User,
                    attributes: ['userId', 'nickname', 'gender', 'age', 'job'],
                    include: [
                        {
                            model: db.UserTag,
                            attributes: ['userId'],
                            include: [
                                {
                                    model: db.Tag,
                                    attributes: ['tagName', 'tagCategoryId'],
                                    where: { tagCategoryId: 2 },
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [
                ['matchingCount', 'DESC'],
                ['participantId', 'ASC'],
            ],
        });
        console.log(count);
        return participants;
    },
    // 참가 신청자 리스트 (커서 X)
    getUpdatedParticipants: async ({ postId, limit }) => {
        const { rows: participants } = await db.Participant.findAndCountAll({
            attributes: ['participantId', 'canceled', 'status', 'matchingCount'],
            where: { postId, canceled: 0, status: 'pending' },
            limit: limit,
            include: [
                {
                    model: db.User,
                    attributes: ['userId', 'nickname', 'gender', 'age', 'job'],
                    include: [
                        {
                            model: db.UserTag,
                            attributes: ['userId'],
                            include: [
                                {
                                    model: db.Tag,
                                    attributes: ['tagName', 'tagCategoryId'],
                                    where: { tagCategoryId: 2 },
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [['matchingCount', 'DESC']],
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
        const updated = await db.Participant.update(
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
