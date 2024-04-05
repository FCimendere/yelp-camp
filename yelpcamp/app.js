const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const { reset } = require('nodemon');
const { request } = require('http');
const methodOverride = require('method-override');

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

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/', (req,res)=> {
    res.render('home')
})

//CRUD - READ | route for all names of the campgrounds
app.get('/campgrounds', async (req,res)=> {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})

//CRUD - CREATE | route for showing form (new add form)
app.get('/campgrounds/new', (req,res) => {
    res.render('campgrounds/new');
})

//CRUD - CREATE | route for submitting form (new add form)
app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})


// Campground details show route
app.get('/campgrounds/:id', async(req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
})

//CRUD - UPDATE/EDIT | route for showing form (edit form)
app.get('/campgrounds/:id/edit', async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground})
})

//CRUD - UPDATE/EDIT | route for submitting form (edit form)
app.put('/campgrounds/:id', async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`)
})

//CRUD - DELETE | delete a campground from the DB
app.delete('/campgrounds/:id', async (req,res)=> {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

//Server Listen
app.listen(3000, () => {
    console.log('Serving on port 3000')
})