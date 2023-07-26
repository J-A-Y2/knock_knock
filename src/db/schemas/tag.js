const Tag = (sequelize, DataTypes) => {
    const Tag = sequelize.define(
        'Tag',
        {
            tagId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tagname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Tag',
            tableName: 'tags',
            paranoid: false,
        },
    );
    Tag.associate = db => {
        db.Tag.belongsTo(db.TagCategory, {
            foreignKey: 'tagCategoryId',
            targetKey: 'tagCategoryId',
        }); // foreignKey는 Tag 모델의 tag_categoryId, targetKey는 TagCategory 모델의 tag_categoryId
        db.Tag.hasMany(db.UserAndTag, {
            foreignKey: 'tagId',
            sourceKey: 'tagId',
        }); // foreignKey는 UserAndTag 모델의 tagId, sourceKey는 Tag 모델의 tagId
    };

    return Tag;
};

export default Tag;
