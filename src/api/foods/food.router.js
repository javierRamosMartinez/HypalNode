//import express
const express = require("express");

const foodRouter = express.Router();
//link to the controller
const {
  getAllFoods,
  getOneFood,
  addFood,
  removeFood,
} = require("./food.controller");
//check auth in middleware
const { isAuth } = require("../middleware/auth.middleware");

foodRouter.get("/", getAllFoods);
foodRouter.get("/:id", getOneFood);
foodRouter.post("/", addFood);
foodRouter.delete("/:id", removeFood);

module.exports = foodRouter;
