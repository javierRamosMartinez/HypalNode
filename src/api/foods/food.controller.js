const Food = require("./food.model");

const addFood = async (req, res) => {
  try {
    const food = new Food(req.body);

    const codeExist = await Food.findOne({ code: req.body.code });
    if (codeExist) {
      return res
        .status(400)
        .json({ status: 400, message: "This food is already registered" });
    }
    const newFood = await food.save();
    console.log(newFood);
    return res.json({
      status: 201,
      message: `Food ${food.name} created`,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const getOneFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    res.json({ status: 200, msg: "ok", data: food });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ status: 200, msg: "ok", data: food });
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });
    res.json({ status: 200, msg: "ok", data: food });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json({ status: 200, msg: "ok", data: foods });
  } catch (error) {
    //specify the error and the location
    res.status(500).json("error getAllFoods", error);
  }
};
module.exports = { addFood, getOneFood, updateFood, removeFood, getAllFoods };
