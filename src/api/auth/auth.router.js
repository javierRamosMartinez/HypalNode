//import express
const express = require("express");

const authRouter = express.Router();
const { register, login } = require("./auth.controller");
const { isAuth } = require("../middleware/auth.middleware");

authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = authRouter;
