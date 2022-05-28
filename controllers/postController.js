const {
  postPerUser,
  createPost,
  allPosts,
  removePost,
  getPost,
} = require("../services/postService");
const rabbitmq = require("../services/rabbitmq");
const { verifyJWT } = require("../services/verifyJWT");

let channel;

rabbitmq.rabbitMQChannel().then((ch) => {
  channel = ch;
});

const getPostsPerUser = async (username, JWTtoken) => {
  const rpcMessage = JWTtoken.toString();

  const verifiedUser = await verifyJWT(channel, rpcMessage);
  //const verifiedUser = true;
  if (verifiedUser === "") {
    throw new Error("not authenticated");
  } else {
    const posts = await postPerUser(username);
    //console.log(posts);
    return posts;
  }
};

const getPostsPerUserSameUser = async (JWTtoken) => {
  const rpcMessage = JWTtoken.toString();
  const verifiedUser = await verifyJWT(channel, rpcMessage);
  //const verifiedUser = true;
  if (verifiedUser === "") {
    throw new Error("not authenticated");
  } else {
    console.log(verifiedUser);
    const posts = await postPerUser(verifiedUser.username);
    //console.log(posts);
    return posts;
  }
};

const savePost = async (content, JWTtoken) => {
  const rpcMessage = JWTtoken.toString();
  const verifiedUser = await verifyJWT(channel, rpcMessage);
  //const verifiedUser = true;

  if (verifiedUser === "") {
    throw new Error("not authenticated");
  } else {
    if (!content) throw new Error("no content");
    const created = await createPost(
      verifiedUser.userId,
      verifiedUser.username,
      content
    );

    return created;
  }
};

const getAllPosts = async (JWTtoken, offset) => {
  const verifiedUser = await verifyJWT(channel, JWTtoken);
  //const verified = true;
  if (verifiedUser === "") {
    throw new Error("not authenticated");
  } else {
    const posts = await allPosts(offset);
    //console.log(posts);
    return posts;
  }
};

const deletePost = async (JWTtoken, postId) => {
  const verifiedUser = await verifyJWT(channel, JWTtoken);

  if (verifiedUser === "") {
    throw new Error("not authenticated");
  }

  const post = await getPost(postId);
  console.log(
    `used_id = ${post.username} user username = ${verifiedUser.username}`
  );
  if (post.username !== verifiedUser.username) {
    throw new Error("not authenticated");
  }

  const deletedPost = await removePost(post.id);
  console.log(deletedPost);
  return deletedPost;
};

exports.savePost = savePost;
exports.getPostsPerUser = getPostsPerUser;
exports.getAllPosts = getAllPosts;
exports.deletePost = deletePost;
exports.getPostsPerUserSameUser = getPostsPerUserSameUser;
