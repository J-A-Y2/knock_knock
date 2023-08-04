import { Op } from 'sequelize';
import { db } from '../index.js';

const ParticipantModel = {
    // 참가 신청
    participatePost: async ({ transaction, userId, postId, status, matchingCount }) => {
        const createParticipant = await db.Participant.create({ userId, postId, status, matchingCount }, { transaction });
        return createParticipant;
    },

    // 참가 신청자 리스트
    getParticipants: async postId => {
        const { rows: participants } = await db.Participant.findAndCountAll({
            attributes: ['participantId', 'canceled', 'status', 'matchingCount',
        [db.sequelize.literal(),`cursor`]],
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
            order: [
                ['matchingCount', 'DESC'],
                ['userId', 'DESC'],
            ],
        });
        return participants;
    },

    // 참가 신청자 리스트 (커서 O)
    getUpdatedParticipantsByCursor: async ({ postId, cursor, limit }) => {
        const { count, rows: participants } = await db.Participant.findAndCountAll({
            attributes: ['participantId', 'canceled', 'status', 'matchingCount'],
            where: { postId, canceled: 0, status: 'pending', matchingCount: { [Op.lt]: cursor } },
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
        // 필요한 정보만 추출하여 반환하고 인덱스 추가
        const processedParticipants = participants.map((participant, index) => ({
            index: index + 1,
            participantId: participant.participantId,
            canceled: participant.canceled,
            status: participant.status,
            matchingCount: participant.matchingCount,
            user: {
                userId: participant.User.userId,
                nickname: participant.User.nickname,
                gender: participant.User.gender,
                age: participant.User.age,
                job: participant.User.job,
                // 필요한 경우 더 많은 사용자 정보 추가 가능
            },
        }));

        console.log(count);
        return processedParticipants;
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
    // matchingCount 수정
    updateMatchingCount: async ({ participantId, matchingCount }) => {
        await db.Participant.update({ matchingCount }, { where: { participantId } });
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
            attributes: ['participantId'],
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
