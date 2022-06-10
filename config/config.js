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
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "postdb",
    host: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  docker: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "postdb",
    host: process.env.DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "postdb",
    host: process.env.DATABASE_URL,
    dialect: "postgres",
  },
};
