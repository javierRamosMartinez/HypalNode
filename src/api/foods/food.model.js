//1 import mongoose and define mongoose.Schema as Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//2 define the model
const foodSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  allergId: [{ type: Schema.Types.ObjectId, ref: "Allergen", required: false }],
  img: { type: String, required: false },
  ing: { type: [String] },
  kcal: { type: Number, required: false },
  fats: { type: Number, required: false },
  satFats: { type: Number, required: false },
  carbohydrates: { type: Number, required: false },
  sugars: { type: Number, required: false },
  dietaryFiber: { type: Number, required: false },
  proteins: { type: Number, required: false },
  salt: { type: Number, required: false },
  weight: { type: Number, required: false },
  diet: [
    {
      type: String,
      default: "",
      enum: ["vegan", "vegetarian", "cruelty free"],
      required: false,
    },
  ], //Seleccion multiple
  brand: { type: String, required: false },
  comments: { type: String, required: false },
});

//3 convert MongoDB model into a JSON
const Food = mongoose.model("Food", foodSchema);
//4 export the model for the controllers
module.exports = Food;
