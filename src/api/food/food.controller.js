const Food = require("./food.model");

const getAllFoods = async (req, res, next) => {
  try {
    const foods = await Food.find();
    res.json({ status: 200, msg: "ok", data: foods });
  } catch (error) {
    //specify the error and the location
    res.status(500).json("error getAllFoods", error);
  }
};

const getOneFood = async (req, res, next) => {
  try {
    const food = await Food.findById(id);
    res.json({ status: 200, msg: "ok", data: food });
  } catch (error) {
    res.status(500).json("error getOneFood", error);
  }
};

const addFood = async (req, res, next) => {
  const {
    fName,
    fCode,
    fAllergId,
    fImg,
    fIng,
    fNValue,
    fDiet,
    fBrand,
    fComments,
  } = req.body;
  try {
    const food = new Food({
      fName,
      fCode,
      fAllergId,
      fImg,
      fIng,
      fNValue,
      fDiet,
      fBrand,
      fComments,
    });
    await food.save();
    res.json(food);
  } catch (err) {
    res.status(500).json("error addFood", error);
  }
};

const removeFood = async (req, res, next) => {
  try {
    const id = req.params.id;
    const food = await Food.findByIdAndDelete(id);

    res.json({ message: "Food removed" });
  } catch (error) {
    res.status(500).json("error removeFood", error);
  }
};
