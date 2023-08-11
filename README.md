# KNOCK KNOCK

<br/>

<img src="./public/logo.png" alt="logo" width="35%" />



<br/>

## 📄 개요

- 서비스명:KnockKnock
- 기획 기간: 2023.07.10 ~ 2023.07.21
- 개발 기간: 2023.07.10 ~ 2023.08.11
- 주제:같은 가치관을 공유하는, 진지한 연애를 원하는 사회 초년생과 안정적인 성인을 대상으로 하는 심층적인 만남의 기회를 제공하는 서비스
- 목표:“낙낙은 두 사람을 특별한 시간과 공간으로 이끄는 재미있는 경험을 제공한다.”
- API 문서: <!-- [바로가기](https://docs.google.com/spreadsheets/d/1t-DNUbVY4GI5NZWTBwCLrzPFFoJMj4t_p9wfY_jemhA/edit?usp=sharing) -->
- 테스트 페이지: [바로가기](http://kdt-ai7-team03.elicecoding.com/)

<br/>

## 🫶 팀원 소개

**정원석**

- Front-End
- wonsuk7950kr@gmail.com
- Github: [@jeong1suk](https://github.com/jeong1suk)

**정재훈**

- Back-End
- wjdwogns120523@gmail.com
- Github: [@J-A-Y2](https://github.com/J-A-Y2)

**허창원**

- Back-End
- wonn22@gmail.com
- Github: [@wonn23](https://github.com/wonn23)

**이은석**

- Back-End
- zhes4593@naver.com
- Github:[@enxxi](https://github.com/enxxi)

**최우현**

- Front-End
- woohyun6549@gamil.com
- Github: [@choiwoohyun123](https://github.com/choiwoohyun123)

**정유진**

- Front-End
- nanyoojinee@gmail.com
- Github: [@nanyoojinee](https://github.com/nanyoojinee)

<br/>

## 기술 스택

### Front-End

<div>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
</div>
<br />

### Back-End

<div>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-47A248?style=flat-square&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-41454A?style=flat-square&logo=JSON%20web%20tokens&logoColor=white"/>
<img src="https://img.shields.io/badge/Passport-34E27A?style=flat-square&logo=Passport&logoColor=white"/>

</div>

<br />

### Server-Infra

<div>
<img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white"/>
<img src="https://img.shields.io/badge/pm2-2B037A?style=flat-square&logo=pm2&logoColor=white"/>
</div>

#### **인공지능**

<div>
<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white"/>
<img src="https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=Pandas&logoColor=white"/>
<img src="https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=NumPy&logoColor=white"/>
<img src="https://img.shields.io/badge/Matplotlib-ffffff?style=flat-square&logo=SoundCharts&logoColor=black"/>
</div>

<br />

### 서비스 구조
<img src="./public/sr.png" alt="logo" width="600px" />

### 프로젝트 기획

<br/>

- **서비스 설명**
    1. **기획 의도 (문제 제시, 문제 해결)**
        - 직장인이 되면 대학생에 비해서 인간관계 폭이 좁아지는 현상이 발생한다. 
        그로 인해 내가 원하는 이성을 만날 기회가 줄어든다. 소모임 등 다양한 커뮤니티에 참여로 시간을 할애하는 것이 부담스러운 사람들을 대상으로 만남의 기회를 제공하자!
        - 표면적으로는 코로나 기간 동안 사람 만나기 어려웠고, 요즘 세대의 특성으로 “서울대 소비트렌드 분석센터 트렌드코리아”  책에서 발표한 키워드 중에 '목적 관계'라는 것이 있다.
        - 예전의 기성세대들은 인간관계 확장을 대부분 우연, 인연에 기대서 했지만,  요즘 세대들은 내가 원하는 관계를 만들어 낸다. 따라서 연애에서도 취미와 목적이 뚜렷하고 비슷한 사람들끼리 만남을 이어나갈려 하는 목적 관계가  요즘 트렌드 중에 하나로 판단했다.
        - KnockKnock 에서는 유저들의 데이터를 기준으로 서로의 가치관과 성향 취미 등이 비슷한 유저들을 추천 해 주는 기능을 도입하여, 서비스 사용 유저가 자신의 이상형을 쉽게 발견 할 수 있도록 돕고, 실제 오프라인에서의 만남을 주도하여 만족스러운 연애 경험을 제공하고자 한다.
    2. **웹 서비스의 최종적인 메인 기능과 서브 기능 설명**
        1. 메인기능
            1. AI를 이용한 퍼스널 컬러 추천과 화장 기능
            2. 회원 데이터를 분석해서 서로 잘 맞는 유저를 추천 해주는 기능
            3. 게시글을 통한 모임 생성 기능
        2. 서브기능
            1. 소켓을 이용한 실시간 채팅 기능
            2. 타로 운세 게임을 통한 유저 추천 기능

<br/>

- **IA**

<img src="./public/IA.png" alt="IA" width="800px" />

- **WBS**

<img src="./public/wbs.png" alt="WBS" width="800px" />

- **ERD**

<img src="./public/erd1.png" alt="ERD" width="800px" />

<img src="./public/erd2.png" alt="ERD" width="800px" />

<img src="./public/erd3.png" alt="ERD" width="800px" />

- **와이어 프레임**

<img src="./public/wirdframe.png" alt="wireframe" width="800px" />


### 가공한 데이터

<!-- <img src="./public/graph1.png" alt="graph" width="600px" />

- 축산업이 탄소배출량에 미치는 영향에 대해 알아보았습니다. 1990년도부터 2020년까지 한국의 총 온실가스 배출량은 줄었지만, 축산업 분야에서 배출한 온실가스의 경우 증가했습니다.

<img src="./public/graph2.png" alt="graph" width="600px" />

- 전체 산업군 배출량 중 축산업의 온실가스 배출량은 20% 이상을 차지합니다.

<img src="./public/graph3.png" alt="graph" width="600px" />

- 음식을 채소류, 육류, 해산물, 기타로 분류해 탄소배출량의 평균을 확인해 보았습니다. <br/>
이는 생산부터 유통까지 모든 과정에서 배출된 온실가스의 양을 의미합니다.<br/>
채소류를 소비 과정에서 배출하는 탄소배출량은 육류 소비 과정에서 탄소배출량에 비해 무려 11배나 낮은 것을 확인할 수 있습니다!<br/> -->

<br/>
## 🔎 주요기능

<!-- -   **회원가입, 로그인 기능**: 사용자의 회원 가입 및 로그인 기능 제공

-   **식단 업로드 기능**: 비건, 베지테리언 식단 업로드 가능

-   **피드 댓글, 대댓글 기능**: 식단 피드에서 댓글, 대댓글을 통해 유저들과 소통 가능

-   **탄소 배출 감소량에 따른 포인트 부여**: 식단 피드 업로드하면 포인트 부여

-   **마이페이지 기능**:
    -   개인 정보, 포인트, 좋아요 등을 확인할 수 있는 마이페이지 기능 제공
    -   개인 정보, 포인트, 좋아요 등
    -   올린 식단 사진 archive
    -   좋아요한 피드 archive

-   **개인정보수정 기능**: 닉네임, 프로필사진, 자기소개 수정 가능

-   **건강 배틀 sns**: 포인트 적립 순위 리스트(랭킹) 기능

-   **Infinite Scroll**: 스크롤을 통해 오래된 피드도 볼 수 있게 하여 사용자의 몰입도를 높이기 위한 기능

-   **게시물 검색 기능**: 검색한 내용과 일치하는 모든 피드들을 볼 수 있는 기능 -->

## 🗂 프로젝트 구조

### [Front-End ](#)

<!-- ```
📦src
 ┣ 📂components
 ┃ ┣ 📂datagraph
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┣ 📜co2bargarphdata.js
 ┃ ┃ ┃ ┣ 📜linegraphdata.js
 ┃ ┃ ┃ ┗ 📜piegraphdata.js
 ┃ ┃ ┗ 📂graph
 ┃ ┃ ┃ ┣ 📜bargraph.jsx
 ┃ ┃ ┃ ┣ 📜co2bargraph.jsx
 ┃ ┃ ┃ ┣ 📜linegraph.css
 ┃ ┃ ┃ ┣ 📜linegraph.jsx
 ┃ ┃ ┃ ┗ 📜piegraph.jsx
 ┃ ┣ 📂pointbar
 ┃ ┃ ┗ 📜pointbar.jsx
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📜addpost.jsx
 ┃ ┃ ┣ 📜postcard.jsx
 ┃ ┃ ┣ 📜postdetail.jsx
 ┃ ┃ ┗ 📜postedit.jsx
 ┃ ┣ 📂rankcard
 ┃ ┃ ┗ 📜rankcard.jsx
 ┃ ┣ 📂rankpagesentence
 ┃ ┃ ┗ 📜rankpagesentence.jsx
 ┃ ┗ 📂user
 ┃ ┃ ┣ 📜usercard.jsx
 ┃ ┃ ┣ 📜userdetail.jsx
 ┃ ┃ ┗ 📜useredit.jsx
 ┣ 📂pages
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜loginform.jsx
 ┃ ┣ 📂mainpage
 ┃ ┃ ┗ 📜mainpage.jsx
 ┃ ┣ 📂rank
 ┃ ┃ ┗ 📜rank.jsx
 ┃ ┣ 📂register
 ┃ ┃ ┗ 📜registerform.jsx
 ┃ ┣ 📂story
 ┃ ┃ ┣ 📜searchpost.jsx
 ┃ ┃ ┗ 📜story.jsx
 ┃ ┣ 📜loading.jsx
 ┃ ┗ 📜notfound.jsx
 ┣ 📂sections
 ┃ ┣ 📜header.jsx
 ┃ ┗ 📜headerlogout.jsx
 ┗ 📂utils
 ┃ ┣ 📂conts
 ┃ ┃ ┗ 📜bucket.js
 ┃ ┣ 📜chunkArray.js
 ┃ ┣ 📜getdays.js
 ┃ ┣ 📜gethours.js
 ┃ ┣ 📜gettime.js
 ┃ ┗ 📜tierdecision.js> `
``` -->

### [Back-End](#)

<!-- ```
📦src
 ┣ 📂controllers
 ┃ ┣ 📜commentController.js
 ┃ ┣ 📜likeController.js
 ┃ ┣ 📜postController.js
 ┃ ┣ 📜rankController.js
 ┃ ┣ 📜searchController.js
 ┃ ┗ 📜userController.js
 ┣ 📂db
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜Comment.js
 ┃ ┃ ┣ 📜Like.js
 ┃ ┃ ┣ 📜Post.js
 ┃ ┃ ┣ 📜Rank.js
 ┃ ┃ ┣ 📜Search.js
 ┃ ┃ ┗ 📜User.js
 ┃ ┗ 📜index.js
 ┣ 📂middlewares
 ┃ ┣ 📜addComment_validate.js
 ┃ ┣ 📜addPost_validate.js
 ┃ ┣ 📜commentParams_validate.js
 ┃ ┣ 📜errorMiddleware.js
 ┃ ┣ 📜getComment_validate.js
 ┃ ┣ 📜getPost_vaildate.js
 ┃ ┣ 📜login_required.js
 ┃ ┣ 📜login_validate.js
 ┃ ┣ 📜postParams_validate.js
 ┃ ┣ 📜register_validate.js
 ┃ ┣ 📜search_validate.js
 ┃ ┣ 📜setComment_validate.js
 ┃ ┣ 📜setPost_validate.js
 ┃ ┣ 📜setUser_validate.js
 ┃ ┗ 📜userParams_validate.js
 ┣ 📂routers
 ┃ ┣ 📜commentRouter.js
 ┃ ┣ 📜likeRouter.js
 ┃ ┣ 📜postRouter.js
 ┃ ┣ 📜rankRouter.js
 ┃ ┣ 📜searchRouter.js
 ┃ ┗ 📜userRouter.js
 ┣ 📂services
 ┃ ┣ 📜commentService.js
 ┃ ┣ 📜likeService.js
 ┃ ┣ 📜postService.js
 ┃ ┣ 📜rankService.js
 ┃ ┣ 📜searchService.js
 ┃ ┗ 📜userService.js
 ┣ 📂utils
 ┃ ┗ 📜statusCode.js
 ┣ 📜app.js
 ┣ 📜aws.config.js
 ┗ 📜babel.config.json
``` -->

<br/>

## 🏁 테스트 방법

---

<!-- 1. 해당 프로젝트를 clone 합니다.

    ```
    git clone https://github.com/J-A-Y2/project2.git
    ```

2. 프로젝트 실행에 필요한 패키지를 설치합니다.

   ```
    cd vegcom_front
    yarn install
    ```

    ```
    cd vegcom_back
    yarn install
    ```

4. 프론트와 백엔드를 실행합니다.

    ```
    cd vegcom_front
    yarn dev
    ```

    ```
    cd vegcom_back
    yarn start
    ``` -->
