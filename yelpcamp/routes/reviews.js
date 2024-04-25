
const express = require('express');
//express seperates route if we are using :id in route, mergeParams makes the routes combine
const router = express.Router({ mergeParams:true });

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError'); 

const {reviewSchema} = require('../schemas.js');
const Campground = require('../models/campground');
const Review = require('../models/review')

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

router.post('/', validateReview, catchAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
    
}))

router.delete('/:reviewId', catchAsync(async(req,res) => {
    const {id,reviewId} = req.params;
    //find only review with reviewId inside the reviews, 
    const currentCamp = await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;