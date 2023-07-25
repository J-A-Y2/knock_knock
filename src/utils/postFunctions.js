const setRecruitedValue = async (user, newPost) => {
    const { gender } = user;
    if (gender === '여') {
        newPost.recruited_f = 1;
    }

    if (gender === '남') {
        newPost.recruited_m = 1;
    }
};

const fieldsToUpdate = {
    post_title: 'post_title',
    post_content: 'post_content',
    post_type: 'post_type',
    place: 'place',
    total_m: 'total_m',
    total_f: 'total_f',
    meeting_time: 'meeting_time',
};

export { setRecruitedValue, fieldsToUpdate };
