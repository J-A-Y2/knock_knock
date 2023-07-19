const Message = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        'Message',
        {
            messageId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            messageContent: {
                type: DataTypes.STRING(40),
                allowNull: false,
            },
            sendId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            receiveId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Message',
            tableName: 'messages',
            paranoid: false,
        },
    );
    Message.associate = db => {
        // foreignKey는 Message모델의 sendId, targetKey는 User 모델의 userId
        db.Message.belongsTo(db.User, {
            foreignKey: 'sendId',
            targetKey: 'user_id',
        });
        // foreignKey는 Message모델의 receiveId, targetKey는 User 모델의 userId
        db.Message.belongsTo(db.User, {
            foreignKey: 'receiveId',
            targetKey: 'user_id',
        });
    };

    return Message;
};

export default Message;
