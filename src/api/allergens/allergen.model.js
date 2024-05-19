//1 import mongoose and define mongoose.Schema as Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//2 define the model
const allergenSchema = new Schema({
  name: { type: String, required: true },
});

//the static method to find allergens by name using a case-insensitive regex search
allergenSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

//3 convert MongoDB model into a JSON
const Allergen = mongoose.model("Allergen", allergenSchema);
//4 export the model for the controllers
module.exports = Allergen;
