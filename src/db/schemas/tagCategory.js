const TagCategory = (sequelize, DataTypes) => {
    const TagCategory = sequelize.define(
        'TagCategory',
        {
            tag_category_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tag_category_name: {
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
            foreignKey: 'tag_category_id',
            sourceKey: 'tag_category_id',
        }); // foreignKey는 Tag 모델의 tag_category_id, sourceKey는 TagCategory 모델의 tag_category_id
    };

    return TagCategory;
};

export default TagCategory;
