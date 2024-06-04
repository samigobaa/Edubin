// import mongoose module
const mongoose = require('mongoose');
// create user schema
const courSchema = mongoose.Schema({
    courName: String,
    courNbrHours: String,
    courDiscription: String,
    
});

const cour = mongoose.model("Cour", courSchema);
module.exports = cour;