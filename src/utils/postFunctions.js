const setRecruitedValue = async (user, newPost) => {
    const { gender } = user;
    if (gender === '여') {
        newPost.recruitedF = 1;
    }

    if (gender === '남') {
        newPost.recruitedM = 1;
    }
};

const fieldsToUpdate = {
    postTitle: 'postTitle',
    postContent: 'postContent',
    postType: 'postType',
    place: 'place',
    totalM: 'totalM',
    totalF: 'totalF',
    meetingTime: 'meetingTime',
};

export { setRecruitedValue, fieldsToUpdate };
