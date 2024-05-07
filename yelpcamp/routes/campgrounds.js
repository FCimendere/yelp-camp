const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor,validateCampground} = require('../middelware.js');
//controllers
const campgrounds = require('../controllers/campgrounds');

//******CAMPGROUND ROUTES******/

//CRUD - READ | route for all names of the campgrounds
router.get('/', catchAsync(campgrounds.index));

//CRUD - CREATE | route for showing form (new add form)
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

//CRUD - CREATE | route for submitting form (new add form)
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

// Campground details show route
router.get('/:id', catchAsync(campgrounds.showCampground));

//CRUD - UPDATE/EDIT | route for showing form (edit form)
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

//CRUD - UPDATE/EDIT | route for submitting form (edit form)
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

//CRUD - DELETE | delete a campground from the DB
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;