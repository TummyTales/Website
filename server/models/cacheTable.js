const mongoose = require('mongoose');
const cacheSchema = new mongoose.Schema({
    email: String,
    recipeId:Number,
    name: String,
    content:String,
    imageLink: String,
    recipeLink: String,
    createdAt: { type: Date },
});


module.exports= mongoose.model('Cache', cacheSchema);