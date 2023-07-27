// 파일명에서 확장자 뽑아내기
const extensionSplit = url => {
    const splitUrl = url.split('.');
    const fileExtension = splitUrl[splitUrl.length - 1];
    return fileExtension;
};

export { extensionSplit };
