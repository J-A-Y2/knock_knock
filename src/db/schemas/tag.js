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
        db.Tag.belongsTo(db.UserAndTag, {
            foreignKey: 'userAndTagId',
            targetKey: 'userAndTagId',
        }); // foreignKey는 Tag 모델의 userAndTagId, targetKey는 UserAndTagId 모델의 userAndTagId
    };

    return Tag;
};

export default Tag;
