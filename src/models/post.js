const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      postId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      profileImage: {
        type: DataTypes.STRING(40),
        allowNull: ture,
      },
      postType: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      postTitle: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      postImage: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
      people: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      place: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      meetingTime: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      postContent: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      isCompleted: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: "Post",
      tableName: "posts",
      paranoid: false,
    }
  );
  Post.associate = (db) => {};

  return Post;
};

export default Post;
