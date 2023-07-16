import express from "express";
import specs from "./swagger/swagger.js";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import { db } from "./models/index.js";
import { userRouter } from "./routers/userRouter.js";
import { postRouter } from "./routers/postRouter.js";
import { messageRouter } from "./routers/messageRotuer.js";
import { commentRouter } from "./routers/commentRouter.js";

const app = express();

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/messages", messageRouter);

dotenv.config();
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});

export { app };
