const Allergen = require("./allergen.model");

const getAllAllergens = async (req, res, next) => {
  try {
    const allergens = await Allergen.find();
    res.json({ status: 200, msg: "ok", data: allergens });
  } catch (error) {
    //specify the error and the location
    res.status(500).json("error getAllAllergens", error);
  }
};

const getOneAllergen = async (req, res, next) => {
  try {
    const allergen = await Allergen.findById(req.params.id);
    res.json({ status: 200, msg: "ok", data: allergen });
  } catch (error) {
    res.status(500).json(error);

  }
};

const addAllergen = async (req, res, next) => {
  try {
    const allergen = new Allergen(req.body)

    const codeExist = await Allergen.findOne({ code: req.body.code })
    if (codeExist) {
      return res.status(400).json({ status: 400, message: "This allergen is already registered" });

    }
    const newAllergen = await allergen.save();
    console.log(newAllergen);
    return res.json({
      status: 201,
      message: `Allergen ${allergen.name} created`,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
  }
};

const removeAllergen = async (req, res, next) => {
  try {
    const allergen = await Allergen.findByIdAndDelete(req.params.id);
    res.json({ status: 200, msg: "ok", data: allergen });
  } catch (error) {
    res.status(500).json(error);

  }
};

module.exports = { getAllAllergens, getOneAllergen, addAllergen, removeAllergen }