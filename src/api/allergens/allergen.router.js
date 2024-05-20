//import express
const express = require("express");

const allergenRouter = express.Router();
//link to the controller
const {
  addAllergen,
  addManyAllergens,
  getOneAllergen,
  updateAllergen,
  removeAllergen,
  getAllAllergens,
} = require("./allergen.controller");
//check auth in middleware
const { isAuth } = require("../middleware/auth.middleware");

allergenRouter.post("/", addAllergen);
allergenRouter.post("/many", addManyAllergens);
allergenRouter.get("/:id", getOneAllergen);
allergenRouter.put("/:id", updateAllergen);
allergenRouter.delete("/:id", removeAllergen);
allergenRouter.get("/", getAllAllergens);

module.exports = allergenRouter;
