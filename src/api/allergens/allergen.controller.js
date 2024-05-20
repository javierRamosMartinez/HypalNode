const Allergen = require("./allergen.model");

const addAllergen = async (req, res, next) => {
  try {
    const allergen = new Allergen(req.body);

    const codeExist = await Allergen.findOne({ name: req.params.name });
    if (codeExist) {
      return res
        .status(400)
        .json({ status: 400, message: "This allergen is already registered" });
    }
    const newAllergen = await allergen.save();
    console.log(newAllergen);
    return res.json({
      status: 201,
      message: `Allergen ${allergen.name} created`,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const addManyAllergens = async (req, res) => {
  try {
    const allergens = req.body;

    // Array para almacenar alérgenos que ya existen
    const existingAllergens = [];

    // Array para almacenar alérgenos que son nuevos y se pueden insertar
    const newAllergens = [];

    // Verificar si cada alérgeno ya existe en la base de datos
    for (const allergen of allergens) {
      const existingAllergen = await Allergen.findOne({ name: allergen.name });

      // Si el alérgeno ya existe, agregarlo al array de alérgenos existentes
      if (existingAllergen) {
        existingAllergens.push(existingAllergen);
      } else {
        // Si el alérgeno no existe, agregarlo al array de alérgenos nuevos
        newAllergens.push(allergen);
      }
    }

    // Si hay alérgenos existentes, devolver un error
    if (existingAllergens.length > 0) {
      return res.status(400).json({
        status: 400,
        message: "Some allergens already exist",
        existingAllergens: existingAllergens,
      });
    }

    // Si no hay alérgenos existentes, insertar los alérgenos nuevos
    const insertedAllergens = await Allergen.insertMany(newAllergens);
    res.status(201).json({
      status: 201,
      message: "Allergens inserted successfully",
      data: insertedAllergens,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
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
const updateAllergen = async (req, res) => {
  try {
    const allergen = await Allergen.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ status: 200, msg: "ok", data: allergen });
  } catch (error) {
    res.status(500).json(error);
  }
};
const removeAllergen = async (req, res, next) => {
  try {
    const allergen = await Allergen.findByIdAndDelete(req.params.id);
    res.json({ status: 200, msg: "removed successfully", data: allergen });
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllAllergens = async (req, res, next) => {
  try {
    const allergens = await Allergen.find();
    res.json({ status: 200, msg: "ok", data: allergens });
  } catch (error) {
    //specify the error and the location
    res.status(500).json("error getAllAllergens", error);
  }
};

module.exports = {
  addAllergen,
  addManyAllergens,
  getOneAllergen,
  updateAllergen,
  removeAllergen,
  getAllAllergens,
};
