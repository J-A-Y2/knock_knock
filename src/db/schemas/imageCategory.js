const ImageCategory = (sequelize, DataTypes) => {
    const ImageCategory = sequelize.define(
        'ImageCategory',
        {
            image_category_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            image_category_name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false, // created_at, updated_at  true: 사용 할겁니다, false: 사용안할 겁니다.
            underscored: true,
            modelName: 'ImageCategory',
            tableName: 'imageCategories',
            paranoid: false, // deleted_at  true: 사용 할겁니다, false: 사용안할 겁니다.
        },
    );
    ImageCategory.associate = db => {
        db.ImageCategory.hasMany(db.Image, {
            foreignKey: 'image_category_id',
            sourceKey: 'image_category_id',
        }); // foreignKey는 Image 모델의 image_category_id, sourceKey는 ImageCategory 모델의 image_category_id
    };

    return ImageCategory;
};

export default ImageCategory;
