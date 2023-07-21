const Participant = (sequelize, DataTypes) => {
    const Participant = sequelize.define(
        'Participant',
        {
            participant_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            canceled: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            status: {
                type: DataTypes.STRING(15),
                allowNull: true,
                defaultValue: 'pending',
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
        // foreignKey는 Participant모델의 user_id, targetKey는 User 모델의 user_id
        db.Participant.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'user_id',
        });
        // foreignKey는 Participant모델의 post_id, targetKey는 Post 모델의 post_id
        db.Participant.belongsTo(db.Post, {
            foreignKey: 'post_id',
            targetKey: 'post_id',
        });
    };

    return Participant;
};

export default Participant;
