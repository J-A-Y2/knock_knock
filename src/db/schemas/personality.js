const Personality = (sequelize, DataTypes) => {
  const Personality = sequelize.define(
    "Personality",
    {
      personalityId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      personalityType: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: "Personality",
      tableName: "personalities",
      paranoid: false,
    }
  );
  Personality.associate = (db) => {
    db.Personality.hasMany(db.UserAndPersonality, {
      foreignKey: "personalityId",
      sourceKey: "personalityId",
    }); // foreignKey는 UserAndPersonality모델의 personalityId, sourceKey는 Personality 모델의 personalityId
  };

  return Personality;
};

export default Personality;
