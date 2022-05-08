const {
  postPerUser,
  createPost,
  allPosts,
} = require("../services/postService");
const rabbitmq = require("../services/rabbitmq");
const { verifyJWT } = require("../services/verifyJWT");

let channel;

rabbitmq.rabbitMQChannel().then((ch) => {
  channel = ch;
});

const getPostsPerUser = async (userId, JWTtoken) => {
  //const verifiedUser = await verifyJWT(channel,rpcMessage)
  const verifiedUser = true;
  if (!verified) {
    throw new Error("not authenticated");
  } else {
    const posts = await postPerUser(userId);
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
    const created = await createPost(verifiedUser.userId, content);

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

exports.savePost = savePost;
exports.getPostsPerUser = getPostsPerUser;
exports.getAllPosts = getAllPosts;
