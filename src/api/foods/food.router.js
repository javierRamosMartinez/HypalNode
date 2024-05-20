//import express
const express = require("express");

const foodRouter = express.Router();
//link to the controller
const {
  addFood,
  getOneFood,
  getByCode,
  updateFood,
  removeFood,
  getAllFoods,
} = require("./food.controller");
//check auth in middleware
const { isAuth } = require("../middleware/auth.middleware");

foodRouter.post("/", addFood);
foodRouter.get("/:id", getOneFood);
foodRouter.get("/code/:code", getByCode);
foodRouter.put("/:id", updateFood);
foodRouter.delete("/:id", removeFood);
foodRouter.get("/", getAllFoods);

module.exports = foodRouter;
