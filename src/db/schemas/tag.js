const Tag = (sequelize, DataTypes) => {
    const Tag = sequelize.define(
        'Tag',
        {
            tag_id: {
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
            foreignKey: 'tag_category_id',
            targetKey: 'tag_category_id',
        }); // foreignKey는 Tag 모델의 tag_category_id, targetKey는 TagCategory 모델의 tag_category_id
        db.Tag.hasMany(db.UserAndTag, {
            foreignKey: 'tag_id',
            sourceKey: 'tag_id',
        }); // foreignKey는 UserAndTag 모델의 tag_id, sourceKey는 Tag 모델의 tag_id
    };

    return Tag;
};

export default Tag;
