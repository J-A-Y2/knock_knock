const BalanceGameResult = (sequelize, DataTypes) => {
    const BalanceGameResult = sequelize.define(
        'BalanceGameResult',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            answer: {
                type: DataTypes.ENUM('left', 'right'),
                allowNull: true,
            },
        },
        {
            sequelize,
            timestamps: true, // created_at, updated_at  true: 사용 할겁니다, false: 사용안할 겁니다.
            underscored: true,
            modelName: 'BalanceGameResult',
            tableName: 'balanceGameResults',
            paranoid: false, // deleted_at  true: 사용 할겁니다, false: 사용안할 겁니다.
        },
    );
    BalanceGameResult.associate = db => {
        db.BalanceGameResult.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'user_id',
        }); // foreignKey는 Image 모델의 image_category_id, sourceKey는 ImageCategory 모델의 image_category_id
    };

    return BalanceGameResult;
};

export default BalanceGameResult;
