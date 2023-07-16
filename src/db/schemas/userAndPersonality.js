const UserAndPersonality = (sequelize, DataTypes) => {
  const UserAndPersonality = sequelize.define(
    "UserAndPersonality",
    {
      userAndPersonalityId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: "UserAndPersonality",
      tableName: "userAndPersonalities",
      paranoid: false,
    }
  );
  UserAndPersonality.associate = (db) => {
    db.UserAndPersonality.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "userId",
    }); // foreignKey는 UserAndPersonality 모델의 userId, targetKey는 User 모델의 userId
    db.UserAndPersonality.belongsTo(db.Hobby, {
      foreignKey: "personalityId",
      targetKey: "personalityId",
    }); // foreignKey는 UserAndPersonality 모델의 hobbyId, targetKey는 Personality 모델의 personalityId
  };

  return UserAndPersonality;
};

export default UserAndPersonality;
