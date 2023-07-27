const User = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
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
            username: {
                type: DataTypes.STRING(5),
                allowNull: false,
            },
            nickname: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            userPassword: {
                type: DataTypes.STRING(60),
                allowNull: false,
            },
            gender: {
                type: DataTypes.STRING(1),
                allowNull: false,
            },
            birthday: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            job: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            region: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            mbti: {
                type: DataTypes.STRING(4),
                allowNull: true,
            },
            religion: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            height: {
                type: DataTypes.STRING(3),
                allowNull: true,
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
            underscored: true,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
        },
    );
    User.associate = db => {
        db.User.hasMany(db.Post, { foreignKey: 'userId' }); // foreignKey는 Post 모델의 userId, sourceKey는 User 모델의 userId
        db.User.hasMany(db.Comment, { foreignKey: 'userId' }); // foreignKey는 Comment 모델의 userId, sourceKey는 User 모델의 userId
        db.User.hasMany(db.Message, { foreignKey: 'sendId' }); // foreignKey는 Message 모델의 send_id, sourceKey는 User 모델의 userId
        db.User.hasMany(db.Message, { foreignKey: 'receiveId' }); // foreignKey는 Message 모델의 recieve_id, sourceKey는 User 모델의 userId
        db.User.hasMany(db.Participant, { foreignKey: 'userId' }); // foreignKey는 Participant 모델의 userId, sourceKey는 User 모델의 userId
        db.User.hasMany(db.UserTag, { foreignKey: 'userId' });
        db.User.hasMany(db.Image, { foreignKey: 'userId' });
        db.User.hasMany(db.BalanceGameResult, { foreignKey: 'userId' });
    };

    return User;
};

export default User;
