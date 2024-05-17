//1 import mongoose and define mongoose.Schema as Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function removeTime(date) {
  return new Date(date.setHours(0, 0, 0, 0));
}

//2 define the model
const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  mail: { type: String, required: true, trim: true },
  regDate: {
    type: Date, default: function () {
      return removeTime(new Date());
    }
  },
  pass: { type: String, required: true },
  allergyId: [{ type: Number }],
  emer: [{ type: String }],
  telf: {
    type: String, validate: {
      validator: function (v) {
        return v.toString().length <= 9;
      },
      message: props => `${props.value} tiene más de 9 dígitos. El número de teléfono debe tener un máximo de 9 dígitos.`
    }
  },
  history: [{ type: String }],
  img: [{ type: String }],
  role: { type: String, default: "user", enum: ["admin", "user"] },
});

//3 convert MongoDB model into a JSON
const User = mongoose.model("User", userSchema);
//4 export the model for the controllers
module.exports = User;
