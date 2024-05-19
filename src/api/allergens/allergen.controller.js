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
const getOneAllergen = async (req, res, next) => {
  try {
    const allergen = await Allergen.findById(req.params.id);
    res.json({ status: 200, msg: "ok", data: allergen });
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateAllergen = async (req, res) => {
  // try {
  //   const allergen = await Allergen.findByIdAndUpdate(req.params.id, {
  //     new: true,
  //   });

  //   if (!allergen) {
  //     return res.status(404).json({ message: "Allergen not found" });
  //   }

  //   res.status(200).json({
  //     message: "Allergen updated successfully",
  //     data: allergen,
  //   });
  // } catch (error) {
  //   console.error("Error updating allergen:", error);
  //   res.status(500).json({ message: "Internal Server Error" });
  // }
  try {
    const { id } = req.params;
    const updateFields = {};

    // Extract fields from the request body
    const { name } = req.body;
    if (name) updateFields.name = name;

    // Update image if provided
    if (req.file) {
      updateFields.image = req.file.path;
    }

    // Find and update the allergen
    const allergenDb = await Allergen.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    // Handle if allergen is not found
    if (!allergenDb) {
      return next(setError(404, "Allergen not found"));
    }

    // If the image has been updated, delete the old one
    if (req.file && allergenDb.image) {
      deleteFile(allergenDb.image);
    }

    // Send the updated allergen object in the response
    return res.status(200).json({ updatedAllergen: allergenDb });
  } catch (error) {
    // Properly handle errors
    return next(setError(500, "Allergen patch server error"));
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
const findAllergenByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res
        .status(400)
        .json({ message: "Name query parameter is required" });
    }

    const allergens = await Allergen.findByName(name);

    if (allergens.length === 0) {
      return res.status(404).json({ message: "No allergens found" });
    }

    return res.status(200).json(allergens);
  } catch (error) {
    return next(setError(500, "error findAllergenByName"));
  }
};
module.exports = {
  addAllergen,
  getOneAllergen,
  updateAllergen,
  removeAllergen,
  getAllAllergens,
  findAllergenByName,
};
