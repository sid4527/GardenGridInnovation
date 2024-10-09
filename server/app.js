const express = require("express");
const cors = require("cors");

const app = express();

app.listen(5000, () => {
  console.log("app server ready on: http://localhost:5000");
});

app.use(cors());
app.use(express.urlencoded({ extends: false }));

const userRouter = require("./router/user");
app.use("/api", userRouter);
