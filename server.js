const express = require('express')
const { Sequelize } = require('sequelize');



const app = express()


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('postdb', 'user', 'password', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize.authenticate().then(() => {
    console.log("good job");
}).catch((err) => { console.log(err); })
