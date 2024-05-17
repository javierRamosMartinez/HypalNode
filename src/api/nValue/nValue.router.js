//import express
const express = require("express");

const nValueRouter = express.Router();
//link to the controller
const { addNValue, removeNValue, updateNValue } = require("./nValue.controller");
//check auth in middleware
const { isAuth } = require("../middleware/auth.middleware");


nValueRouter.post("/", addNValue);
nValueRouter.delete("/:id", removeNValue);
nValueRouter.put("/:id", updateNValue);

module.exports = nValueRouter;
