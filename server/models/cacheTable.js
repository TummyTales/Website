const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
    email: String,
    name: String,
    imageLink: String,
    recipeLink: String
});

module.exports= mongoose.model('Cache', cacheSchema);