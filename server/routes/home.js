const express = require("express");
const cors = require("cors");
const getRecipes = require("../api/getRecipes")
const {parseRecipes} = require("../api/getRecipes");
const mongoose=require('mongoose');
const cacheTable=require('../api/cacheTableEntry');
const Cache=require('../models/cacheTable');
const Contact=require('../models/contactTable');

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

router.post('/contactus', async (req, res) => {
    const { FName, LName, Email, Review } = req.body;

    try {
        const newContactUs = new Contact({ 
            FName:FName, 
            LName:LName, 
            Email:Email,
            Review:Review 
        });
        await newContactUs.save();
        res.status(200).json({ message: 'Form submitted successfully', data: newContactUs });
    } catch (error) {
        console.error(error);
        res.status(200).json({ message: 'Error submitting the form.' });
    }
});

router.post("/login", async (req, res) => {
    const data=req.body;
    const searchEmail=data.email;
    
    try {
        const result = await Cache.find({ email: searchEmail });
        console.log('Matching users:', result);
        res.json(result);
      } catch (err) {
        console.error(err);
      }
      

   
});


router.post("/api/data", (req, res) => {
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
