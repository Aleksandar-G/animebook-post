const { Post } = require("../models");

const postPerUser = (username) => {
  return Post.findAll({
    where: {
      username: username,
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
  console.log(`fetch timestamp: ${fetchStop}`);
  return posts;
};

const createPost = async (userId, username, content) => {
  const createStart = Date.now();
  const post = await Post.create({
    user_id: userId,
    username: username,
    content: content,
  });
  const createStop = Date.now() - createStart;
  console.log(`create timestamp: ${createStop}`);

  return post;
};

exports.postPerUser = postPerUser;
exports.createPost = createPost;
exports.allPosts = allPosts;
