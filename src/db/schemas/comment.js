const Comment = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'Comment',
        {
            comment_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            comment_content: {
                type: DataTypes.STRING(40),
                allowNull: true,
            },
            profile_image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
        },
    );
    Comment.associate = db => {
        db.Comment.belongsTo(db.Post, {
            foreignKey: 'post_id',
            targetKey: 'post_id',
        }); // foreignKey는 Post모델의 post_id, targetKey는 User 모델의 post_id

        db.Comment.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'user_id',
        }); // foreignKey는 Comment모델의 user_id, targetKey는 User 모델의 user_id
    };

    return Comment;
};

export default Comment;
