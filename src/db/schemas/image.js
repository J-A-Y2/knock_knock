const Image = (sequelize, DataTypes) => {
    const Image = sequelize.define(
        'Image',
        {
            image_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true, // created_at, updated_at  true: 사용 할겁니다, false: 사용안할 겁니다.
            underscored: true,
            modelName: 'Image',
            tableName: 'images',
            paranoid: true, // deleted_at  true: 사용 할겁니다, false: 사용안할 겁니다.
        },
    );
    Image.associate = db => {
        db.Image.belongsTo(db.ImageCategory, {
            foreignKey: 'image_category_id',
            targetKey: 'image_category_id',
        }); // foreignKey는 Image 모델의 image_category_id, targetKey는 ImageCategory 모델의 image_category_id
        db.Image.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'user_id',
        }); // foreignKey는 Image 모델의 user_id, sourceKey는 User 모델의 user_id
        db.Image.belongsTo(db.Post, {
            foreignKey: 'post_id',
            targetKey: 'post_id',
        });
    };

    return Image;
};

export default Image;
