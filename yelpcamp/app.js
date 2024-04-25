const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError'); 
const {campgroundSchema, reviewSchema} = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const Campground = require('./models/campground');
const Review = require('./models/review')
const { reset } = require('nodemon');
const { request } = require('http');
const methodOverride = require('method-override');
const { errorMonitor } = require('events');

const campgrounds = require('./routes/campgrounds');

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
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));



//JOI server side data validator middelware for reviews
const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
}

app.use('/campgrounds', campgrounds)

app.get('/', (req,res)=> {
    res.render('home')
})



app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
    
}))

app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async(req,res) => {
    const {id,reviewId} = req.params;
    //find only review with reviewId inside the reviews, 
    const currentCamp = await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))

app.all('*', (req,res,next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err,req,res,next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something went wrong baby!'
    res.status(statusCode).render('error', {err});
})

//Server Listen
app.listen(3000, () => {
    console.log('Serving on port 3000')
})