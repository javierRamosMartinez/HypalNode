//import express
const express = require("express");

const emerRouter = express.Router();
//link to the controller
const { addEmer, removeEmer, updateEmer } = require("./emer.controller");
//check auth in middleware
const { isAuth } = require("../middleware/auth.middleware");


emerRouter.post("/", addEmer);
emerRouter.delete("/:id", removeEmer);
emerRouter.put("/:id", updateEmer);

module.exports = emerRouter;
