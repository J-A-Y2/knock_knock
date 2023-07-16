const Participant = (sequelize, DataTypes) => {
  const Participant = sequelize.define(
    "Participant",
    {
      participantId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      canceled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
      modelName: "Participant",
      tableName: "participants",
      paranoid: false,
    }
  );
  Participant.associate = (db) => {};

  return Participant;
};

export default Participant;
