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
  Ideal.associate = (db) => {};

  return Ideal;
};

export default Ideal;
