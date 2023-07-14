import Sequelize from "sequelize";
import { config } from "../config/config.js";
import User from "./user.js";
import Post from "./post.js";
import Comment from "./comment.js";
import dotenv from "dotenv";

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { host: config.host, port: config.port, dialect: config.dialect }
);

db.User = User(sequelize, Sequelize);
Object.keys(db).forEach((modelName) => {
  // associate 호출
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default { config, db };
