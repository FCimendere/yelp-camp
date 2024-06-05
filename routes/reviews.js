
const express = require('express');
//express seperates route if we are using :id in route, mergeParams makes the routes combine
const router = express.Router({ mergeParams:true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError'); 
const { validateReview, isLoggedIn,isReviewAuthor } = require('../middelware.js');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;