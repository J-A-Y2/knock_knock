import express from "express";
import specs from "./swagger/swagger.js";
import swaggerUi from "swagger-ui-express";
// import db from "./models/index.js";

const app = express();

// db.sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("데이터베이스 연결 성공");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// app.use("/users", userRouter);

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});

export { app };
