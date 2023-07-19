const Message = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        'Message',
        {
            message_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            message_content: {
                type: DataTypes.STRING(40),
                allowNull: false,
            },
            send_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            receive_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: {
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
