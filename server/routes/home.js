const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const getRecipes = require("../api/getRecipes")
const getAllRecipesFromIngredientList = require("../api/getRecipes");
const {get} = require("axios");
const {parseRecipes} = require("../api/getRecipes");
const mongoose=require('mongoose');
const Cache=require('../models/cache');

mongoose.set('strictQuery',false);

const router = express.Router();

router.use(express.json());

router.use(cors({
    origin: '*',
}));

router.get("/", (req, res) => {
    res.send("Home page");
});

router.get("/about-us", (req, res) => {
    res.send("About us page");
});

router.get("/contact", (req, res) => {
    res.send("Contact us page");
});


router.post("/login", (req, res) => {
    const data=req.body;
    const email=data.email;
    console.log(email);
});



router.post("/api/data",async  (req, res) => {
    const data = req.body;
    const ingredientList=data.ingredients;
    const user=data.user;
    const email=user.email;

    getRecipes.getAllRecipesFromIngredientList(ingredientList)
        .then(async (responseData) => {
            const parsedData=parseRecipes(responseData);
            await res.json(parsedData);
            
            await Cache.deleteMany({email:email});
            
            parsedData.map(async (recipeData) => {
                const name=recipeData.name;
                const imageLink=recipeData.imageLink;
                const recipeLink=recipeData.recipeLink;
               
                const cache = new Cache({
                   email:email,
                   name: name,
                   imageLink:imageLink,
                   recipeLink: recipeLink, 

                });

                await cache.save();
                
              });
    })
        .catch((error) => {
        console.error("An Error Occurred :", error);
    });
});

module.exports = router;
