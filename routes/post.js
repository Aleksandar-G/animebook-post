const express = require("express")
const router = express.Router()
const { postPerUser, createPost } = require("../controllers/postController")
const rabbitmq = require('../services/rabbitmq')
const { verifyJWT } = require('../services/verifyJWT')

let channel;

rabbitmq.rabbitMQChannel()
    .then((ch) => {
        channel = ch
    })

// fetch posts per user
router.get('/:userId', (req, res) => {

    const rpcMessage = { "token": req.headers.authorization, "username": req.body.username }

    rabbitmq.sendRPCRequest(channel, rpcMessage, rabbitmq.verifyQueue)
        .then((verified) => {

            if (!verified) {
                res.status(401)
                res.send("not authenticated")
            } else {
                const posts = postPerUser(req.params.userId)

                res.send(posts)
            }
        })
})

// create a new post
router.post('/', (req, res) => {


    const rpcMessage = { "token": req.headers.authorization, "username": req.body.username }

    rabbitmq.sendRPCRequest(channel, rpcMessage, rabbitmq.verifyQueue).then((verified) => {
        if (!verified) {
            res.status(401)
            res.send('not authenticated')
        } else {
            const user_id = req.body.user_id
            const content = req.body.content
            const saved = createPost(user_id, content)
            if (!saved) {
                res.status(500)
            } else {
                res.status(201)
                res.send("saved",)
            }
        }
    })
})

module.exports = router