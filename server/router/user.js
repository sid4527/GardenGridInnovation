const express = require("express");
const userHandler = require("./handler/user");

const router = express.Router();

router.post("/register", userHandler.reguser);

router.post("/login", userHandler.login);

module.exports = router;
