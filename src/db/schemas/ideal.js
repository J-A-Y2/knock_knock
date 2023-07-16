const Ideal = (sequelize, DataTypes) => {
  const Ideal = sequelize.define(
    "Ideal",
    {
      idealId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idealType: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: "Ideal",
      tableName: "ideals",
      paranoid: false,
    }
  );
  Ideal.associate = (db) => {
    db.Ideal.hasMany(db.UserAndIdeal, {
      foreignKey: "idealId",
      sourceKey: "idealId",
    }); // foreignKey는 UserAndIdeal모델의 idealId, sourceKey는 Ideal 모델의 idealId
  };

  return Ideal;
};

export default Ideal;
