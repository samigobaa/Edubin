const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    studentId:String,
    studentName:String,
    studentLastName:String,
    studentNote:String
    });
    const notes = mongoose.model("Note", noteSchema);
module.exports = notes;
