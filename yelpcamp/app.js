const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

const mongoUrl = 'mongodb://127.0.0.1:27017/yelp-camp';

//MongoDB connection
mongoose.connect(mongoUrl);

//DB connection check
const db =mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database Connected');
});

const app = express();

// Setting for ejs engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res)=> {
    res.render('home')
})

//CRUD - READ | route for all names of the campgrounds
app.get('/campgrounds', async (req,res)=> {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})

//Server Listen
app.listen(3000, () => {
    console.log('Serving on port 3000')
})