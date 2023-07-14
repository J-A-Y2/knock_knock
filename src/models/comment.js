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
  Comment.associate = (db) => {
    db.Comment.belongs(db.Post, { foreignKey: "postId", targetKey: "postId" }); // foreignKey는 Post모델의 postId, targetKey는 User 모델의 postId
  };

  return Comment;
};

export default Comment;
