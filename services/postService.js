const { Post } = require("../models/");

const postPerUser = (userId) => {
    return Post.findAll({
        where: {
            user_id: userId
        }
    }).then((posts) => {
        return posts
    })
}

const createPost = async (userId, content) => {
    const post = await Post.create({user_id:userId,content:content})

    return post
}

exports.postPerUser = postPerUser;
exports.createPost = createPost;