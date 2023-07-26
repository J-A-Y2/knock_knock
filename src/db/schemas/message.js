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
        },
        {
            sequelize,
            timestamps: true,
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
            targetKey: 'userId',
        });
        // foreignKey는 Message모델의 receiveId, targetKey는 User 모델의 userId
        db.Message.belongsTo(db.User, {
            foreignKey: 'receiveId',
            targetKey: 'userId',
            // foreignKey는 Message모델의 send_id, targetKey는 User 모델의 user_id
        });
        db.Message.belongsTo(db.ChatRoom, {
            foreignKey: 'chatId',
            targetKey: 'chatId',
        });
    };

    return Message;
};

export default Message;
