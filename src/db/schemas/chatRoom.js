const ChatRoom = (sequelize, DataTypes) => {
    const ChatRoom = sequelize.define(
        'ChatRoom',
        {
            chat_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            first_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            second_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'ChatRoom',
            tableName: 'chatRooms',
            paranoid: false,
        },
    );
    ChatRoom.associate = db => {
        db.ChatRoom.hasMany(db.Message, {
            foreignKey: 'chat_id',
            sourceKey: 'chat_id',
        });
    };

    return ChatRoom;
};

export default ChatRoom;
