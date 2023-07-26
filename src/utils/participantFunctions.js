import { throwNotFoundError } from './commonFunctions.js';
import { ParticipantModel } from '../db/models/ParticipantModel.js';
import { ConflictError } from '../middlewares/errorMiddleware.js';

const checkParticipation = async (type, participation, userId) => {
    const { Post, canceled, status, User } = participation;

    throwNotFoundError(Post, '게시글');

    if (Post.user_id !== userId) {
        throw new ConflictError(`참가자 ${type} 권한이 없습니다.`);
    }

    if (canceled) {
        throw new ConflictError('취소된 신청 정보입니다.');
    }

    if (status !== 'pending') {
        throw new ConflictError('이미 수락되었거나 거절된 유저입니다.');
    }

    return { Post, canceled, status, User };
};

const updateRecruitedValue = async (gender, total_m, total_f, recruited_f, recruited_m) => {
    let fieldToUpdate, newValue;
    if (gender === '여') {
        fieldToUpdate = 'recruited_f';

        if (recruited_f === total_f) {
            throw new ConflictError('더 이상 여성 유저의 신청을 수락할 수 없습니다.');
        }
        newValue = recruited_f + 1;
    }

    if (gender === '남') {
        fieldToUpdate = 'recruited_m';
        if (recruited_m === total_m) {
            throw new ConflictError('더 이상 남성 유저의 신청을 수락할 수 없습니다.');
        }
        newValue = recruited_m + 1;
    }
    return { fieldToUpdate, newValue };
};

const getHobbyAndIdeal = async user => {
    let hobby = [];
    let ideal = [];

    for (const userAndTag of user.UserAndTags) {
        if (userAndTag.Tag.tag_category_id === 1) {
            hobby.push(userAndTag.Tag.tagname);
        } else if (userAndTag.Tag.tag_category_id === 3) {
            ideal.push(userAndTag.Tag.tagname);
        }
    }

    return { hobby, ideal };
};

const getParticipantsList = async (participants, ideal) => {
    const participantsList = participants.map(participant => {
        const personality = participant.User.UserAndTags.map(userAndTag => userAndTag.Tag.tagname);

        // ideal 배열과 personality 배열에서 일치하는 항목 개수 세기
        const matchingCount = ideal.filter(tag => personality.includes(tag)).length;

        return {
            participationId: participant.participant_id,
            userId: participant.User.user_id,
            status: participant.status,
            nickname: participant.User.nickname,
            gender: participant.User.gender,
            age: participant.User.age,
            job: participant.User.job,
            profile_image: participant.User.profile_image,
            personality,
            matchingCount,
        };
    });
    return participantsList;
};
export { checkParticipation, updateRecruitedValue, getHobbyAndIdeal, getParticipantsList };
