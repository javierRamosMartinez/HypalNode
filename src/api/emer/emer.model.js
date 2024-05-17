//1 import mongoose and define mongoose.Schema as Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//2 define the model
const emerSchema = new Schema({
    name: { type: String, required: true, trim: true },
    telf: {
        type: String, validate: {
            validator: function (v) {
                return v.toString().length <= 9;
            },
            message: props => `${props.value} tiene más de 9 dígitos. El número de teléfono debe tener un máximo de 9 dígitos.`
        }
    },
    email: { type: String },
});

//3 convert MongoDB model into a JSON
const Emer = mongoose.model("Emer", emerSchema);
//4 export the model for the controllers
module.exports = Emer;