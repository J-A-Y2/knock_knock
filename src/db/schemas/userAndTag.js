const UserAndTag = (sequelize, DataTypes) => {
    const UserAndTag = sequelize.define(
        'UserAndTag',
        {
            user_and_tag_id: {
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
            foreignKey: 'user_id',
            targetKey: 'user_id',
        }); // foreignKey는 Tag 모델의 userId, targetKey는 User 모델의 userId
        db.UserAndTag.belongsTo(db.Tag, {
            foreignKey: 'tag_id',
            targetKey: 'tag_id',
        }); // foreignKey는 UserAndTag 모델의 tagId, sourceKey는 Tag 모델의 tagId
    };

    return UserAndTag;
};

export default UserAndTag;
