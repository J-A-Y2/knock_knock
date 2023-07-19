const UserAndPersonality = (sequelize, DataTypes) => {
    const UserAndPersonality = sequelize.define(
        'UserAndPersonality',
        {
            userAndPersonalityId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'UserAndPersonality',
            tableName: 'userAndPersonalities',
            paranoid: false,
        },
    );
    UserAndPersonality.associate = db => {
        db.UserAndPersonality.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'user_id',
        }); // foreignKey는 UserAndPersonality 모델의 userId, targetKey는 User 모델의 userId
        db.UserAndPersonality.belongsTo(db.Personality, {
            foreignKey: 'personalityId',
            targetKey: 'personalityId',
        }); // foreignKey는 UserAndPersonality 모델의 personalityId, targetKey는 Personality 모델의 personalityId
    };

    return UserAndPersonality;
};

export default UserAndPersonality;
