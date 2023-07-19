const User = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            user_id: {
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
            user_password: {
                type: DataTypes.STRING(60),
                allowNull: false,
            },
            gender: {
                type: DataTypes.STRING(1),
                allowNull: false,
            },
            birthday: {
                type: DataTypes.DATE,
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
            profileImage: {
                type: DataTypes.STRING,
                allowNull: true,
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
            hobby: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            personality: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ideal: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            introduce: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            is_deleted: {
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
        db.User.hasMany(db.Post, { foreignKey: 'user_id' }); // foreignKey는 Post 모델의 user_id, sourceKey는 User 모델의 user_id
        db.User.hasMany(db.Comment, { foreignKey: 'user_id' }); // foreignKey는 Comment 모델의 user_id, sourceKey는 User 모델의 user_id
        db.User.hasMany(db.Message, { foreignKey: 'send_id' }); // foreignKey는 Message 모델의 send_id, sourceKey는 User 모델의 user_id
        db.User.hasMany(db.Message, { foreignKey: 'receive_id' }); // foreignKey는 Message 모델의 recieve_id, sourceKey는 User 모델의 user_id
        db.User.hasMany(db.Participant, { foreignKey: 'user_id' }); // foreignKey는 Participant 모델의 user_id, sourceKey는 User 모델의 user_id
    };

    return User;
};

export default User;
