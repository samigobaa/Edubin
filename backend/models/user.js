// import mongoose module
const mongoose = require("mongoose");
// create user schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    tel: String,
    role: String,
    speciality:String,
    adresse:String,
  userFile:String,
  noteStudent:String
});

const user = mongoose.model("User", userSchema);
module.exports = user;