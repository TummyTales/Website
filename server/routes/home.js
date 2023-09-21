const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const getRecipes = require("../Controller/getRecipes")
const {parseRecipes} = require("../Controller/getRecipes");
const cacheTable=require('../Controller/cacheTableEntry');
const Cache=require('../models/cacheTable');
const Contact=require('../models/contactUsTable');
const sendMail = require("../Controller/sendEmail")

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
    console.log(sendMail(Email))
    console.log("EMail sent")
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
