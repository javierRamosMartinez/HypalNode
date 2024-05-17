//import express
const express = require("express");

const allergenRouter = express.Router();
//link to the controller
const {
  getAllAllergens,
  getOneAllergen,
  addAllergen,
  removeAllergen,
} = require("./allergen.controller");
//check auth in middleware
const { isAuth } = require("../middleware/auth.middleware");

allergenRouter.get("/", getAllAllergens);
allergenRouter.get("/:id", getOneAllergen);
allergenRouter.post("/", addAllergen);
allergenRouter.delete("/:id", removeAllergen);

module.exports = allergenRouter;
