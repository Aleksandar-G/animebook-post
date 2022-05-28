const express = require("express");
const router = express.Router();
const {
  getPostsPerUser,
  savePost,
  getAllPosts,
  deletePost,
  getPostsPerUserSameUser,
} = require("../controllers/postController");

//user profile
router.get("/profile", (req, res) => {
  const JWTtoken = req.headers?.authorization;
  console.log(JWTtoken);
  if (JWTtoken === null) {
    res.status(403);
    res.send("not authenticated");
  }
  getPostsPerUserSameUser(JWTtoken)
    .then((posts) => {
      console.log("posts");
      console.log(posts);
      res.status(200);
      res.send(posts);
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "not authenticated") {
        res.status(401);
        res.send(err.message);
      } else {
        res.status(500);
        res.send("error");
      }
    });
});

//fetch all posts
router.get("/", (req, res) => {
  const JWTtoken = req.headers.authorization;
  const offset = req.body.offset;
  console.log("get all posts");
  if (JWTtoken === undefined) {
    console.log(req.headers);
    res.status(401);
    res.send("not authenticated");
  }

  getAllPosts(JWTtoken, offset)
    .then((posts) => {
      res.status(200);
      res.send(posts);
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "not authenticated") {
        res.status(401);
        res.send(err.message);
      } else {
        res.status(500);
        res.send("error");
      }
    });
});

// create a new post
router.post("/", (req, res) => {
  const content = req.body.content;
  if (!req.headers.authorization) {
    res.status(401);
    res.send("not authenticated");
  }
  const JWTtoken = req.headers.authorization;

  console.log(JWTtoken);

  if (content === undefined || JWTtoken === undefined) {
    res.status(400);
    res.send("bad request");
  }
  savePost(content, JWTtoken)
    .then((post) => {
      res.status(200);
      res.send(post);
    })
    .catch((err) => {
      console.log(err);
      if (err.message === "not authenticated") {
        res.status(401);
        res.send(err.message);
      } else if (err.message === "no content") {
        res.status(403);
        res.send(err.message);
      } else {
        res.status(500);
        res.send("post has not been saved");
      }
    });
});

// delete post
router.delete("/:postId", (req, res) => {
  const JWTtoken = req.headers?.authorization;
  const postId = req.params?.postId;

  console.log(JWTtoken);
  console.log(postId);
  if (JWTtoken === undefined) {
    res.status(403);
    res.send("not authenticated");
  }

  if (postId === undefined) {
    res.status(400);
    res.send("bad request");
  }

  deletePost(JWTtoken, postId)
    .then((deletedPost) => {
      res.sendStatus(204);
      //res.sendStatus(deletedPost);
    })
    .catch((err) => {
      if (err.message === "not authenticated") {
        res.status(403);
        res.send("not authenticated");
      } else {
        console.log(err.message);
        res.status(500);
        res.send("problem with deleting the post");
      }
    });
});

// fetch posts per user
router.get("/:username", (req, res) => {
  const JWTtoken = req.headers.authorization;
  const username = req.params.username;

  getPostsPerUser(username, JWTtoken)
    .then((posts) => {
      res.status(200);
      res.send(posts);
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "not authenticated") {
        res.status(401);
        res.send(err.message);
      } else {
        res.status(500);
        res.send("error");
      }
    });
});

module.exports = router;
