const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'The new review was created!');
    res.redirect(`/campgrounds/${campground._id}`);
    
}

module.exports.deleteReview = async(req,res) => {
    const {id,reviewId} = req.params;
    //find only review with reviewId inside the reviews, 
    const currentCamp = await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Your review successfully deleted!');
    res.redirect(`/campgrounds/${id}`);
}

