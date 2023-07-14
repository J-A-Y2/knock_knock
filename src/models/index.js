import Sequelize from "sequelize";
import { config } from "../config/config.js";
import User from "./user.js";
import Post from "./post.js";
import Comment from "./comment.js";

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

db.Post = Post(sequelize, Sequelize);
Object.keys(db).forEach((modelName) => {
  // associate 호출
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Comment = Comment(sequelize, Sequelize);
Object.keys(db).forEach((modelName) => {
  // associate 호출
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { config, db };
