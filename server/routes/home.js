const express = require("express");
const cors = require("cors");
const getRecipes = require("../api/getRecipes")
const {parseRecipes} = require("../api/getRecipes");
const mongoose=require('mongoose');
const cacheTable=require('../api/cacheTableEntry');

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

            await cacheTable.cacheEntry(parsedData, email);             
        })
        .catch((error) => {
        console.error("An Error Occurred :", error);
    });
});

module.exports = router;
