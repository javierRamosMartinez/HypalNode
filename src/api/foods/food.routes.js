const express = require("express");

const foodRouter = express.Router();

const {
    getAllFoods,
    addFood,
    removeFood
} = require("./food.controller");

const { isAuth } = require("../middleware/auth.middleware");

characterRouter.post("/", [isAuth], create);
foodRouter.get('/', getAllFoods);
foodRouter.post('/', addFood);
foodRouter.delete('/:id', removeFood);

module.exports = foodRouter;