const Post = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'Post',
        {
            post_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            profileImage: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            postType: {
                type: DataTypes.STRING(5),
                allowNull: false,
            },
            postTitle: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            postImage: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            place: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            meetingTime: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            postContent: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            isCompleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            total_m: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            total_f: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            recruited_m: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            recruited_f: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
        },
    );
    Post.associate = db => {
        db.Post.hasMany(db.Comment, { foreignKey: 'post_id', sourceKey: 'post_id' }); // foreignKey는 Post모델의 postId, sourceKey는 User 모델의 postId
        db.Post.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'user_id' }); // foreignKey는 Post모델의 userId, targetKey는 User 모델의 userId
        db.Post.hasMany(db.Participant, {
            foreignKey: 'post_id',
            sourceKey: 'post_id',
        }); // foreignKey는 Participant모델의 postId, sourceKey는 Post 모델의 postId
    };

    return Post;
};

export default Post;
