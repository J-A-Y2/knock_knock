const Message = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        'Message',
        {
            message_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            sender_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            message_content: {
                type: DataTypes.STRING(40),
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
        // foreignKey는 Message모델의 send_id, targetKey는 User 모델의 user_id
        db.Message.belongsTo(db.Chat, {
            foreignKey: 'chat_id',
            targetKey: 'chat_id',
        });
    };

    return Message;
};

export default Message;
