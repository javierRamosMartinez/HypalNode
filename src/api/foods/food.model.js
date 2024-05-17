//1 import mongoose and define mongoose.Schema as Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//2 define the model
const foodSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  allergId: [{ type: Schema.Types.ObjectId, ref: "Allergen" }],
  img: [{}],
  ing: { type: [String] },
  nValue: [{ type: Schema.Types.ObjectId, ref: "FNValue" }],
  diet: [{
    type: String,
    default: "",
    enum: ["vegan", "vegetarian", "cruelty free"],
  }], //Seleccion multiple
  brand: { type: String },
  comments: { type: String },
});

//3 convert MongoDB model into a JSON
const Food = mongoose.model("Food", foodSchema);
//4 export the model for the controllers
module.exports = Food;
