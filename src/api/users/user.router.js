//import express
const express = require("express");

const userRouter = express.Router();
const { getAll, getOne } = require("./user.controller");
const { isAuth } = require("../middleware/auth.middleware");

userRouter.get("/", getAll);
userRouter.get("/:id", getOne);
// userRouter.post("/logout", [isAuth], logout);

module.exports = userRouter;
