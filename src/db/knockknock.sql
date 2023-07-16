DROP DATABASE IF EXISTS knockknock;
CREATE DATABASE knockknock;

USE knockknock;
DROP TABLE IF EXISTS personalities;
CREATE TABLE personalities (
	personality_id 		INT 	NOT NULL AUTO_INCREMENT,
    personality_type	VARCHAR(15) NOT NULL,
PRIMARY KEY(personality_id)
);
INSERT INTO personalities VALUES(NULL, '활발한');
INSERT INTO personalities VALUES(NULL, '조용한');
INSERT INTO personalities VALUES(NULL, '애교가 넘치는');
INSERT INTO personalities VALUES(NULL, '어른스러운');
INSERT INTO personalities VALUES(NULL, '열정적인');
INSERT INTO personalities VALUES(NULL, '또라이 같은');
INSERT INTO personalities VALUES(NULL, '예의바른');
INSERT INTO personalities VALUES(NULL, '유머러스한');
INSERT INTO personalities VALUES(NULL, '꼼꼼한');
INSERT INTO personalities VALUES(NULL, '진지한');
INSERT INTO personalities VALUES(NULL, '자신감 넘치는');
INSERT INTO personalities VALUES(NULL, '허세없는');
INSERT INTO personalities VALUES(NULL, '엉뚱한');
INSERT INTO personalities VALUES(NULL, '지적인');
INSERT INTO personalities VALUES(NULL, '성실한');
INSERT INTO personalities VALUES(NULL, '감성적인');
INSERT INTO personalities VALUES(NULL, '논리적인');
INSERT INTO personalities VALUES(NULL, '증흑적인');
INSERT INTO personalities VALUES(NULL, '소심한');
INSERT INTO personalities VALUES(NULL, '쿨한');

DROP TABLE IF EXISTS hobbies;
CREATE TABLE hobbies (
	hobby_id 		INT 	NOT NULL AUTO_INCREMENT,
    hobby_type	VARCHAR(15) NOT NULL,
PRIMARY KEY(hobby_id)
);
INSERT INTO hobbies VALUES(NULL, '영화');
INSERT INTO hobbies VALUES(NULL, '코인노래방');
INSERT INTO hobbies VALUES(NULL, '맥주');
INSERT INTO hobbies VALUES(NULL, '카페');
INSERT INTO hobbies VALUES(NULL, '독서');
INSERT INTO hobbies VALUES(NULL, '맛집탐방');
INSERT INTO hobbies VALUES(NULL, '여행');
INSERT INTO hobbies VALUES(NULL, '등산');
INSERT INTO hobbies VALUES(NULL, '러닝');
INSERT INTO hobbies VALUES(NULL, '산책');
INSERT INTO hobbies VALUES(NULL, '댄스');
INSERT INTO hobbies VALUES(NULL, '골프');
INSERT INTO hobbies VALUES(NULL, '헬스');
INSERT INTO hobbies VALUES(NULL, '필라테스');
INSERT INTO hobbies VALUES(NULL, '홈트레이닝');
INSERT INTO hobbies VALUES(NULL, '클라이밍');
INSERT INTO hobbies VALUES(NULL, '자전거라이딩');
INSERT INTO hobbies VALUES(NULL, '캠핑');
INSERT INTO hobbies VALUES(NULL, '공부');
INSERT INTO hobbies VALUES(NULL, '볼링');
INSERT INTO hobbies VALUES(NULL, '요리');
INSERT INTO hobbies VALUES(NULL, '그림 그리기');
INSERT INTO hobbies VALUES(NULL, '음악 듣기');
INSERT INTO hobbies VALUES(NULL, '악기 여주');
INSERT INTO hobbies VALUES(NULL, '사진 찍기');
INSERT INTO hobbies VALUES(NULL, '웹툰');
INSERT INTO hobbies VALUES(NULL, '게임');
INSERT INTO hobbies VALUES(NULL, '전시회 관람');
INSERT INTO hobbies VALUES(NULL, '봉사활동');
INSERT INTO hobbies VALUES(NULL, '드라이브');

DROP TABLE IF EXISTS ideals;
CREATE TABLE ideals (
	ideal_id 		INT 	NOT NULL AUTO_INCREMENT,
    ideal_type	VARCHAR(15) NOT NULL,
PRIMARY KEY(ideal_id)
);
INSERT INTO ideals VALUES(NULL, '옷 잘 입는');
INSERT INTO ideals VALUES(NULL, '듬직한');
INSERT INTO ideals VALUES(NULL, '아담한');
INSERT INTO ideals VALUES(NULL, '연상');
INSERT INTO ideals VALUES(NULL, '연하');
INSERT INTO ideals VALUES(NULL, '동갑');
INSERT INTO ideals VALUES(NULL, '취미가 같은');
INSERT INTO ideals VALUES(NULL, '말이 통하는');
INSERT INTO ideals VALUES(NULL, '잘 웃어주는');
INSERT INTO ideals VALUES(NULL, '잘 들어주는');
INSERT INTO ideals VALUES(NULL, '활발한');
INSERT INTO ideals VALUES(NULL, '조용한');
INSERT INTO ideals VALUES(NULL, '애교가 넘치는');
INSERT INTO ideals VALUES(NULL, '어른스러운');
INSERT INTO ideals VALUES(NULL, '열정적인');
INSERT INTO ideals VALUES(NULL, '또라이 같은');
INSERT INTO ideals VALUES(NULL, '예의바른');
INSERT INTO ideals VALUES(NULL, '유머러스한');
INSERT INTO ideals VALUES(NULL, '꼼꼼한');
INSERT INTO ideals VALUES(NULL, '진지한');
INSERT INTO ideals VALUES(NULL, '자신감 넘치는');
INSERT INTO ideals VALUES(NULL, '허세없는');
INSERT INTO ideals VALUES(NULL, '엉뚱한');
INSERT INTO ideals VALUES(NULL, '지적인');
INSERT INTO ideals VALUES(NULL, '성실한');
INSERT INTO ideals VALUES(NULL, '감성적인');
INSERT INTO ideals VALUES(NULL, '논리적인');
INSERT INTO ideals VALUES(NULL, '증흑적인');
INSERT INTO ideals VALUES(NULL, '소심한');
INSERT INTO ideals VALUES(NULL, '쿨한');

