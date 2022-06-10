const { Sequelize } = require("sequelize");

const databaseUrl = process.env.DATABASE_URL;
const databaseUser = process.env.DATABASE_USER || "user";
const databasePassword = process.env.DATABASE_PASSWORD || "password";
const databasePort = process.env.DATABASE_PORT || "5432";

console.log(databaseUser);
console.log(databasePassword);
console.log(databasePort);
//Connect to databse
const database = new Sequelize("postdb", databaseUser, databasePassword, {
  host: databaseUrl,
  port: databasePort,
  dialect: "postgres",
});
database
  .authenticate()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = database;
