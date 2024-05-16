const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    fName: { type: String, required: true },
    fCode: { type: String, required: true, unique: true },
    fAllergId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Allergen' }],
    fImg: { type: String },
    fIng: [{ type: String }],
    fNValue: [{}],//Array de strings
    fDiet: { type: String, default: "", enum: ["vegan", "vegetarian", "cruelty free"] },//Seleccion multiple
    fBrand: { type: String },
    fComments: { type: String },
});

module.exports = mongoose.model('Food', FoodSchema);