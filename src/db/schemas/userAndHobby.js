const UserAndHobby = (sequelize, DataTypes) => {
  const UserAndHobby = sequelize.define(
    "UserAndHobby",
    {
      userAndHobbyId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: "UserAndHobby",
      tableName: "userAndHobbies",
      paranoid: false,
    }
  );
  UserAndHobby.associate = (db) => {
    db.UserAndHobby.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "userId",
    }); // foreignKey는 UserAndHobby 모델의 userId, targetKey는 User 모델의 userId
    db.UserAndHobby.belongsTo(db.Hobby, {
      foreignKey: "hobbyId",
      targetKey: "hobbyId",
    }); // foreignKey는 UserAndHobby 모델의 hobbyId, targetKey는 Hobby 모델의 hobbyId
  };

  return UserAndHobby;
};

export default UserAndHobby;
