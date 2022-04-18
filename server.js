require('dotenv').config()
const express = require('express')
const postRouter = require('./routes/post')
const { database } = require('./utils/database')

const PORT = process.env.SERVER_PORT

//start server
const app = express()

app.use(express.json())

app.listen(PORT, () => {
    console.log("Listening on port 3000!")
});

//routers
app.use('/post', postRouter)
