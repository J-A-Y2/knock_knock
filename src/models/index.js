import Sequelize from "sequelize";
import Config from "../config/config.js";
import User from "./user.js";

const config = Config;
const db = {};
console.log("index.js의 config", config);
const sequelize = new Sequelize(
  config.username,
  config.password,
  config.database,
  config,
  { dialect: "mysql", host: config.host, port: 3306 }
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
