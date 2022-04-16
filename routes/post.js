const express = require("express")
const router = express.Router()
const { getPostsPerUser, savePost } = require("../controllers/postController")


// fetch posts per user
router.get('/', (req, res) => {

    const rpcMessage = { "token": req.headers.authorization, "username": req.body.username }
    const userId = req.body.userId

    getPostsPerUser(userId, rpcMessage).then((posts) => {
        res.status(200)
        res.send(posts)
    }).catch((err) => {
        if (err.message === "not authenticated") {
            res.status(401)
            res.send(err.message)
        }else{
            res.status(500)
            res.send("error")
        }
    })
})

// create a new post
router.post('/', (req, res) => {
    const userId = req.body.userId
    const content = req.body.content

    const rpcMessage = { "token": req.headers.authorization, "username": req.body.username }

    savePost(userId,content, rpcMessage).then((post) => {
        res.status(200)
        res.send(post)
    }).catch((err) => {
        console.log(err);
        if (err.message === 'not authenticated') {
            res.status(401)
            res.send(err.message)
        }
        else if(err.message === "no content"){
            res.status(403)
            res.send(err.message)
        }
        else{
            res.status(500)
            res.send("post has not been saved")
        }
    })


})

module.exports = router