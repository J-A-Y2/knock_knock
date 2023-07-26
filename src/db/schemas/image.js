const Image = (sequelize, DataTypes) => {
    const Image = sequelize.define(
        'Image',
        {
            imageId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            imageUrl: {
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
            foreignKey: 'imageCategoryId',
            targetKey: 'imageCategoryId',
        }); // foreignKey는 Image 모델의 image_category_id, targetKey는 ImageCategory 모델의 image_category_id
        db.Image.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        }); // foreignKey는 Image 모델의 userId, sourceKey는 User 모델의 userId
        db.Image.belongsTo(db.Post, {
            foreignKey: 'postId',
            targetKey: 'postId',
        });
    };

    return Image;
};

export default Image;
