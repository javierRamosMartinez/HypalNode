//1 import mongoose and define mongoose.Schema as Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//2 define the model
const allergenSchema = new Schema({
  AName: { type: String, required: true },
});

//3 convert MongoDB model into a JSON
const Allergen = mongoose.model("Allergen", allergenSchema);
//4 export the model for the controllers
module.exports = Allergen;
