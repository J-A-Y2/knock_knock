const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      userName: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      nickName: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      userPassword: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      birthday: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      job: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      mbti: {
        type: DataTypes.STRING(4),
        allowNull: true,
      },
      religion: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hobby: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      personality: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ideal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      introduce: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: "User",
      tableName: "users",
      paranoid: true,
    }
  );
  User.associate = (db) => {};

  return User;
};

export default User;
