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
    const allergen = await Allergen.findById(id);
    res.json({ status: 200, msg: "ok", data: allergen });
  } catch (error) {
    res.status(500).json("error getOneAllergen", error);
  }
};

const addAllergen = async (req, res, next) => {
  const AName = req.body;
  try {
    const allergen = new Allergen({
      AName,
    });
    await allergen.save();
    res.json(allergen);
  } catch (err) {
    res.status(500).json("error addAllergen", error);
  }
};

const removeAllergen = async (req, res, next) => {
  try {
    const id = req.params.id;
    const allergen = await Allergen.findByIdAndDelete(id);
    res.json({ message: "Allergen removed" });
  } catch (error) {
    res.status(500).json("error removeFood", error);
  }
};
