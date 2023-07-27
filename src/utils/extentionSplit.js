// 파일명에서 확장자 뽑아내기
const extentionSplit = url => {
    const splitUrl = url.split('.');
    const fileExtention = splitUrl[splitUrl.length - 1];
    return fileExtention;
};

export { extentionSplit };
