//import express
const express = require("express");

const userRouter = express.Router();
const {
  getAll,
  getOne,
  updateUser,
  updateUserPatch,
  updatingHistory,
} = require("./user.controller");
const { isAuth } = require("../middleware/auth.middleware");

userRouter.get("/", getAll);
userRouter.get("/:id", getOne);
userRouter.put("/:id", updateUser);
// userRouter.post("/logout", [isAuth], logout);
// userRouter.patch("/allergens/:id", updateUserPatch);
userRouter.patch("/history/:id", updatingHistory);

module.exports = userRouter;
