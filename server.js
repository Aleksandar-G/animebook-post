const express = require('express')
const { Sequelize } = require('sequelize');
const postRouter = require('./routes/post')

//Connect to databse
const sequelize = new Sequelize('postdb', 'user', 'password', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
sequelize.authenticate().then(() => {
    console.log("good job");
}).catch((err) => { console.log(err); })

//start server
const app = express()

app.use(express.json())

app.listen(3000, () => {
    console.log("Listening on port 3000!")
});

//routers
app.use('/', postRouter)
