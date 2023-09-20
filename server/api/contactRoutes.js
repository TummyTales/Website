const express = require('express');
const Contact = require('./contact'); // Import the Contact model
const router = express.Router();

// POST route to handle "Contact Us" form submissions
 router.post('/contactus', async (req, res) => {
    const { firstname, lastname, email, review } = req.body;

    try {
        const newContactUs = new ContactUs({ firstname, lastname, email, review });
        const savedContactUs = await newContactUs.save();
        res.status(200).json({ message: 'Form submitted successfully', data: savedContactUs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting the form.' });
    }
});

module.exports = router;
// JavaScript source code
