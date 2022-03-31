const { Post } = require("../models/");

export const postPerUser = (userId) => {
    Post.findAll({
        where: {
            user_id: userId
        }
    }).then((posts) => {
        return posts
        //console.log(posts);
    })
}

export const createPost = (userId, content) => {
    Post.create({ userId, content }).then(() => {
        return true
    }).catch(() => { return false })
}