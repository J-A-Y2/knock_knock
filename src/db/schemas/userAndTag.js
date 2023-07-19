const UserAndTag = (sequelize, DataTypes) => {
    const UserAndTag = sequelize.define(
        'UserAndTag',
        {
            userAndTagId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'UserAndTag',
            tableName: 'userAndTags',
            paranoid: false,
        },
    );
    UserAndTag.associate = db => {
        db.UserAndTag.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        }); // foreignKey는 Tag 모델의 userId, targetKey는 User 모델의 userId
        db.UserAndTag.belongsTo(db.Tag, {
            foreignKey: 'tagId',
            targetKey: 'tagId',
        }); // foreignKey는 UserAndTag 모델의 tagId, sourceKey는 Tag 모델의 tagId
    };

    return UserAndTag;
};

export default UserAndTag;
