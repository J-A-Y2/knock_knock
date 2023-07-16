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
  Hobby.associate = (db) => {};

  return Hobby;
};

export default Hobby;
