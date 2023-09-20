const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoutes = require('./contactRoutes');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Connect to MongoDB (update the connection string)
mongoose.connect('mongodb+srv://shreyash101:dcba4321@shreyashcluster.m3b8vtj.mongodb.net/TummyTales', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const db = mongoose.connection;
app.use('/api', contactRoutes); // Mount the router under controller

// Define a schema for contactus (customize as needed)
const contactUsSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    review: String,
    timestamp: { type: Date, default: Date.now },
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);


//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

// Handle form contactus
app.post('/contactus', async (req, res) => {
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



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

