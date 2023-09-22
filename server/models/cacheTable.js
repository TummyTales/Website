const mongoose = require('mongoose');
const cacheSchema = new mongoose.Schema({
    _id:Number,
    email: String,
    name: String,
    content:String,
    imageLink: String,
    recipeLink: String,
    createdAt: { type: Date },
});


module.exports= mongoose.model('Cache', cacheSchema);