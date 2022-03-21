const express = require("express")
const router = express.Router()

router.get('/:userId', (req, res) => {
    res.send(req.params.userId)
})

router.post('/', (req, res) => {
    res.send("post")
})

module.exports = router