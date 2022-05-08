const { Post } = require("../models");

const postPerUser = (userId) => {
  return Post.findAll({
    where: {
      user_id: userId,
    },
  }).then((posts) => {
    return posts;
  });
};

const allPosts = async (offset) => {
  const fetchStart = Date.now();
  const posts = await Post.findAll({
    limit: 10,
    order: [["createdAt", "DESC"]],
    offset: offset,
  });
  const fetchStop = Date.now() - fetchStart;
  console.log(fetchStop);
  return posts;
};

const createPost = async (userId, content) => {
  const createStart = Date.now();
  const post = await Post.create({ user_id: userId, content: content });
  const createStop = Date.now() - createStart;
  console.log(createStop);

  return post;
};

exports.postPerUser = postPerUser;
exports.createPost = createPost;
exports.allPosts = allPosts;
