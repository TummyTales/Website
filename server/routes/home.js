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
    const CLIENT_ID = '896418670759-k384oqt0ri9cbsij9vong5h1gfcn13t0.apps.googleusercontent.com'
    const CLIENT_SECRET = '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'
    const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
    const REFRESH_TOKEN = '1//04bnRi0Q0DDwZCgYIARAAGAQSNwF-L9IrxlaUqd3LRwVQu5oqp3QYz5zWv7yV-nfcyklJYaD8M7gG4krdICS-sw0WuZmiUEYY2OE';
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

    async function sendMail() {
        try {
            const accessToken = await oAuth2Client.getAccessToken()

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: '1ms21is102@msrit.edu',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                }

            });

            const mailOptions = {
                from: '1ms21is102@msrit.edu',
                to: Email,
                subject: 'Re: Your Feedback on TummyTales',
                text: 'Hey There!Thank you for taking the time to share your feedback with us regarding your experience on TummyTales. We truly appreciate your input, and your satisfaction is important to us.We are delighted to hear that you have been enjoying our recipes and finding them helpful in your culinary adventures. At TummyTales, we are committed to providing a wide variety of delicious recipes and cooking tips to our users, and your positive feedback encourages us to continue our efforts. We have also taken note of your suggestions and requests.Your feedback helps us understand what our users are looking for, and we are continuously working to enhance our website based on your valuable insights.We will certainly consider your ideas for future improvements.If you have any more feedback, questions, or specific recipes you would like to see on our website, please feel free to reach out to us anytime. Your feedback is an essential part of our ongoing commitment to delivering a top-notch culinary experience.Thank you for being a part of the TummyTales community.We look forward to serving you with even more exciting recipes and culinary inspiration in the future.Happy cooking!    Warm regards,'
            };
            const result = await transport.sendMail(mailOptions);
            return result;




        } catch (error) {
            return error;
        }

    }
    sendMail().then(result => console.log('email is sent...', result))
        .catch(error => console.log(error.message));


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
