const setRecruitedValue = async (user, postInfo) => {
    const { gender } = user;
    if (gender === '여') {
        postInfo.recruitedF = 1;
    }

    if (gender === '남') {
        postInfo.recruitedM = 1;
    }
};

const fieldsToUpdate = {
    title: 'title',
    content: 'content',
    type: 'type',
    place: 'place',
    totalM: 'totalM',
    totalF: 'totalF',
    meetingTime: 'meetingTime',
};

export { setRecruitedValue, fieldsToUpdate };
