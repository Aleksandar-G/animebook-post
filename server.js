require("dotenv").config();
const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const { database } = require("./utils/database");

const PORT = process.env.SERVER_PORT || 3000;

//start server
const app = express();

app.use(express.json());

//enable cors
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

//routers
app.use("/post", postRouter);
//app.use(postRouter);

app.get("/health-check", (req, res) => {
  res.status(200);
  res.send("ON GOOGLE CLOUD BABY");
});
