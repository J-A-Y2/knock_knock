const TagCategory = (sequelize, DataTypes) => {
    const TagCategory = sequelize.define(
        'TagCategory',
        {
            tagCategoryId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tagCategoryName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'TagCategory',
            tableName: 'tagCategories',
            paranoid: false,
        },
    );
    TagCategory.associate = db => {
        db.TagCategory.hasMany(db.Tag, {
            foreignKey: 'tagCategoryId',
            sourceKey: 'tagCategoryId',
        }); // foreignKey는 Tag 모델의 tagCategoryId, sourceKey는 TagCategory 모델의 tagCategoryId
    };

    return TagCategory;
};

export default TagCategory;
