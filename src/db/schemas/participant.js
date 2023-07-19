const Participant = (sequelize, DataTypes) => {
    const Participant = sequelize.define(
        'Participant',
        {
            participantId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            canceled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Participant',
            tableName: 'participants',
            paranoid: false,
        },
    );
    Participant.associate = db => {
        // foreignKey는 Participant모델의 userId, targetKey는 User 모델의 userId
        db.Participant.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        });
        // foreignKey는 Participant모델의 postId, targetKey는 Post 모델의 postId
        db.Participant.belongsTo(db.Post, {
            foreignKey: 'postId',
            targetKey: 'postId',
        });
    };

    return Participant;
};

export default Participant;
