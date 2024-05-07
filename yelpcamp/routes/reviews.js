
const express = require('express');
//express seperates route if we are using :id in route, mergeParams makes the routes combine
const router = express.Router({ mergeParams:true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError'); 
const { validateReview } = require('../middelware.js');
const Campground = require('../models/campground');
const Review = require('../models/review')


router.post('/', validateReview, catchAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'The new review was created!');
    res.redirect(`/campgrounds/${campground._id}`);
    
}))

router.delete('/:reviewId', catchAsync(async(req,res) => {
    const {id,reviewId} = req.params;
    //find only review with reviewId inside the reviews, 
    const currentCamp = await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Your review successfully deleted!');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;