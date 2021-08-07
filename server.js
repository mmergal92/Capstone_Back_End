//////////////////////////////
//DEPENDENCIES
/////////////////////////////

// Import Dependencies 

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require('express-session');

require('dotenv').config();

// Create App Object

const app = express();


//Importing Models

// const rssFeed = require('./models/rssFeed.js')

// Middleware 

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public')); // In 'public' folder we can put files to have access anywhere
app.use(session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false
}))
// Routes

app.get("/", (req, res) =>{
    res.send("Server Working!");
});


// Controllers

const userController = require('./controllers/UserComment.js')
app.use('/user', userController)

// Declaring Ports

const PORT = process.env.PORT || 4000;
const MONGODB_URL = process.env.MONGODB_URL; 

// Database Connection

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.connection.once('open', () => {
    console.log('Linked to MongoDB')
})

// Server Listener

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
