const UserAndIdeal = (sequelize, DataTypes) => {
    const UserAndIdeal = sequelize.define(
        'UserAndIdeal',
        {
            userAndIdealId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'UserAndIdeal',
            tableName: 'userAndIdeals',
            paranoid: false,
        },
    );
    UserAndIdeal.associate = db => {
        db.UserAndIdeal.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        }); // foreignKey는 UserAndIdeal 모델의 userId, targetKey는 User 모델의 userId
        db.UserAndIdeal.belongsTo(db.Ideal, {
            foreignKey: 'idealId',
            targetKey: 'idealId',
        }); // foreignKey는 UserAndIdeal 모델의 idealId, targetKey는 Ideal 모델의 idealId
    };

    return UserAndIdeal;
};

export default UserAndIdeal;
