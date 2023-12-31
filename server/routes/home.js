const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const getRecipes = require("../controller/getRecipes")
const {parseRecipes} = require("../controller/getRecipes");
const cacheTable=require('../controller/cacheTableEntry');
const Cache=require('../models/cacheTable');
const Contact=require('../models/contactUsTable');
const sendmail = require("../controller/sendEmail")
const recipeinfo = require("../controller/recipeInfo")
const instructions=require('../controller/instructions');

mongoose.set('strictQuery',false);

const router = express.Router();

// Middleware
router.use(express.json());
router.use(cors({
    origin: '*',
}));

// Routes
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
    await sendmail.sendMail(Email)
});


router.post("/login", async (req, res) => {
    const data=req.body;
    const searchEmail=data.email;
    try {
        const result = await Cache.find({ email: searchEmail });
        // console.log('Matching users:', result);
        res.json(result);
      } catch (err) {
        console.error(err);
      }
});


router.post("/api/data", (req, res) => {
    const data = req.body;
    const ingredientList=data.ingredients;
    // const user=data.user;
    // const email=user.email;

    getRecipes.getAllRecipesFromIngredientList(ingredientList)
        .then(async (responseData) => {
            const parsedData=parseRecipes(responseData);
            res.json(parsedData);

            // await cacheTable.cacheEntry(parsedData, email);             
        })
        .catch((error) => {
        console.error("An Error Occurred :", error);
    });
});

router.post("/cache", async (req, res) => {
    const data=req.body;
    const searchEmail=data.email;
    const id=data.id;
    // recipeinfo.getRecipeInfo(id).then(response => console.log(recipeinfo.parseRecipeData(response)))
    try {
            const parsedData={id:id, name:data.name,content:data.content, imageLink:data.imageLink, recipeLink:data.recipeLink }
            await cacheTable.cacheEntry(parsedData, searchEmail);
       
      } catch (err) {
        console.error(err);
      }
});
router.post("/recipe", async (req, res) => {
        const data=req.body;
        const id=data.id;
        console.log(id);
        try {
            const [parsedData1, parsedData2] = await Promise.all([
                recipeinfo.getRecipeInfo(id).then(responseData => recipeinfo.parseRecipeData(responseData)),
                instructions.getInstructions(id).then(responseData => instructions.parseInstructions(responseData))
            ]);
            console.log(parsedData1);
            console.log(parsedData2);
    
            res.json({
                parsedData1: parsedData1,
                parsedData2: parsedData2
            });
        } catch (error) {
            console.error("An Error Occurred:", error);
            res.status(500).json({ error: "An error occurred" });
        }
    });

module.exports = router;
