const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    FName: String,
    LName:String,
    Email: String,
    Review: String,
});

module.exports= mongoose.model('Contact', contactSchema);
