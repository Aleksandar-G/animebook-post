const express = require("express")
const { Post } = require("../models/");
const router = express.Router()

// fetch posts per user
router.get('/:userId', (req, res) => {


    Post.findAll({
        where: {
            user_id: req.params.userId
        }
    }).then((posts) => {
        res.send(posts)
        console.log(posts);
    })

})

// create a new post
router.post('/', (req, res) => {
    const user_id = req.body.user_id
    const content = req.body.content
    Post.build({ user_id, content }).save().then(() => {
        res.status(201)
        res.send("saved",)
    })
})

module.exports = router