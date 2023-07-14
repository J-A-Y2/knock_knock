const Comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      commentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      commentContent: {
        type: DataTypes.STRING(40),
        allowNull: ture,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: "Comment",
      tableName: "comments",
      paranoid: false,
    }
  );
  Comment.associate = (db) => {};

  return Comment;
};

export default User;
