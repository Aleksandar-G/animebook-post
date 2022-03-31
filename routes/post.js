const express = require("express")
const router = express.Router()
const { postPerUser, createPost } = require("../controllers/postController")

// fetch posts per user
router.get('/:userId', (req, res) => {

    const posts = postPerUser(req.params.userId)

    res.send(posts)

})

// create a new post
router.post('/', (req, res) => {
    const user_id = req.body.user_id
    const content = req.body.content
    const saved = createPost(user_id, content)
    if (!saved) {
        res.status(500)
    } else {
        res.status(201)
        res.send("saved",)
    }
})

module.exports = router