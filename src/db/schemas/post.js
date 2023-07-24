const Post = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'Post',
        {
            post_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            profile_image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            post_type: {
                type: DataTypes.STRING(5),
                allowNull: false,
            },
            post_title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            post_image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            place: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            meeting_time: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            post_content: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            is_completed: {
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
                defaultValue: 0,
            },
            recruited_f: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
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
        db.Post.hasMany(db.Comment, { foreignKey: 'post_id', sourceKey: 'post_id' }); // foreignKey는 Post모델의 post_id, sourceKey는 User 모델의 post_id
        db.Post.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'user_id' }); // foreignKey는 Post모델의 user_id, targetKey는 User 모델의 user_id
        db.Post.hasMany(db.Participant, {
            foreignKey: 'post_id',
            sourceKey: 'post_id',
        }); // foreignKey는 Participant모델의 post_id, sourceKey는 Post 모델의 post_id
        db.Post.hasMany(db.Image, { foreignKey: 'post_id' });
    };

    return Post;
};

export default Post;
