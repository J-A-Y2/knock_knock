const File = (sequelize, DataTypes) => {
    const File = sequelize.define(
        'File',
        {
            fileId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            fileUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true, // created_at, updated_at  true: 사용 할겁니다, false: 사용안할 겁니다.
            underscored: true,
            modelName: 'File',
            tableName: 'files',
            paranoid: false, // deleted_at  true: 사용 할겁니다, false: 사용안할 겁니다.
        },
    );
    File.associate = db => {
        db.File.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        }); // foreignKey는 Image 모델의 userId, sourceKey는 User 모델의 userId
        db.File.belongsTo(db.Post, {
            foreignKey: 'postId',
            targetKey: 'postId',
        });
    };

    return File;
};

export default File;
