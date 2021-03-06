require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "postdb",
    host: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  test: {
    username: "user",
    password: "password",
    database: "postdb",
    host: "localhost",
    dialect: "postgres",
  },
  docker: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "postdb",
    host: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};
