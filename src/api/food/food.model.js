//1 import mongoose and define mongoose.Schema as Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//2 define the model
const foodSchema = new Schema({
  fName: { type: String, required: true },
  fCode: { type: String, required: true, unique: true },
  fAllergId: [{ type: Schema.Types.ObjectId, ref: "Allergen" }],
  fImg: { type: String },
  fIng: [{ type: String }],
  fNValue: [{}], //Array de strings
  fDiet: {
    type: String,
    default: "",
    enum: ["vegan", "vegetarian", "cruelty free"],
  }, //Seleccion multiple
  fBrand: { type: String },
  fComments: { type: String },
});

//3 convert MongoDB model into a JSON
const Food = mongoose.model("Food", foodSchema);
//4 export the model for the controllers
module.exports = Food;
