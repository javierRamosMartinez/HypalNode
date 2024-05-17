//1 import mongoose and define mongoose.Schema as Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//2 define the model
const nValueSchema = new Schema({
    kcal: { type: Number },
    fats: { type: Number },
    satFats: { type: Number },
    carbohydrates: { type: Number },
    sugars: { type: Number },
    dietaryFiber: { type: Number },
    proteins: { type: Number },
    salt: { type: Number },
    weight: { type: Number },
});

//3 convert MongoDB model into a JSON
const NValue = mongoose.model("NValue", nValueSchema);
//4 export the model for the controllers
module.exports = NValue;