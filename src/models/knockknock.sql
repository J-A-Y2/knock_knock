DROP DATABASE IF EXISTS knockknock;
CREATE DATABASE knockknock;

USE knockknock;
DROP TABLE IF EXISTS users;
CREATE TABLE users(
	userId 			INT 		 NOT NULL AUTO_INCREMENT,
	email 			VARCHAR(40)  NOT NULL,
	userName 		CHAR(5) 	 NOT NULL,
	nickName 		VARCHAR(15)  NOT NULL,
	userPassword 	VARCHAR(40)  NOT NULL,
	gender 			CHAR(1) 	 NOT NULL,
	birthday 		CHAR(8) 	 NOT NULL,
	job 			VARCHAR(20)  NOT NULL,
	porfileImage 	BLOB 		 NULL,
	mbti 			CHAR(4) 	 NULL,
	religion 		VARCHAR(10)  NULL,
	height 			TINYINT 	 UNSIGNED NOT NULL,
	hobby 			VARCHAR(250) NOT NULL,
	personality 	VARCHAR(250) NOT NULL,
	ideal 			VARCHAR(250) NOT NULL,
	introduce 		VARCHAR(250) NULL,
	isDeleted 		BOOLEAN      NOT NULL DEFAULT FALSE,
PRIMARY KEY (userId)
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
	postId 			INT 		 NOT NULL AUTO_INCREMENT,
	userId 			INT 		 NOT NULL,
	profileImage 	BLOB 		 NULL,
	postType 		CHAR(4) 	 NOT NULL,
	postTitle 		VARCHAR(100) NOT NULL,
	postImage 		BLOB 		 NULL,
	people 			TINYINT   	 UNSIGNED NOT NULL,
	place 			VARCHAR(20)  NOT NULL,
	meetingTime 	VARCHAR(20)  NOT NULL,
	postContent 	VARCHAR(200) NOT NULL,
	isCompleted 	BOOLEAN 	 NOT NULL DEFAULT FALSE,
PRIMARY KEY (postId),
FOREIGN KEY(userId) REFERENCES users(userId)
);
 
DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
	commentId		INT				NOT NULL AUTO_INCREMENT,
	postId			INT				NOT NULL,
	userId			INT				NOT NULL,
	commentContent	VARCHAR(500)	NOT NULL,
	createdAt		DATETIME		NOT NULL,
PRIMARY KEY(commentId),
FOREIGN KEY(postId) REFERENCES posts(postId),
FOREIGN KEY(userId) REFERENCES users(userId)   
);