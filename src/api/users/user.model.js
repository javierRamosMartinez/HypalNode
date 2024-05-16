//1 import mongoose and define mongoose.Schema as Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//2 define the model
const userSchema = new Schema({
  uName: { type: String, required: true, trim: true },
  uMail: { type: String, required: true, trim: true, unique: true },
  uRegDate: { type: Date },
  uPass: { type: String, required: true },
  uAllergyId: { type: Number },
  uEmer: [{ type: String }],
  uTelf: { type: Number },
  uHistory: [{ type: String }],
  uPic: { type: String },
  uRole: { type: String, default: "user", enum: ["admin", "user"] },
});

//3 convert MongoDB model into a JSON
const User = mongoose.model("User", userSchema);
//4 export the model for the controllers
module.exports = User;
