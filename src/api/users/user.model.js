const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

const User = mongoose.model("User", userSchema);
module.exports = User;