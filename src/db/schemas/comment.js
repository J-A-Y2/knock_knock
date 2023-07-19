const Comment = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'Comment',
        {
            commentId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            commentContent: {
                type: DataTypes.STRING(40),
                allowNull: true,
            },
            profileImage: {
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
        }); // foreignKey는 Post모델의 postId, targetKey는 User 모델의 postId

        db.Comment.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'user_id',
        }); // foreignKey는 Comment모델의 userId, targetKey는 User 모델의 userId
    };

    return Comment;
};

export default Comment;
