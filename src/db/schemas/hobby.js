const Hobby = (sequelize, DataTypes) => {
  const Hobby = sequelize.define(
    "Hobby",
    {
      hobbyId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      hobbyType: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: "Hobby",
      tableName: "hobbies",
      paranoid: false,
    }
  );
  Hobby.associate = (db) => {
    db.Hobby.hasMany(db.UserAndHobby, {
      foreignKey: "userAndHobbyId",
      sourceKey: "hobbyId",
    }); // foreignKey는 UserAndHobby모델의 userAndHobbyId, sourceKey는 Hobby 모델의 hobbyId
  };

  return Hobby;
};

export default Hobby;
