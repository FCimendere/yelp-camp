const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor,validateCampground} = require('../middelware.js');
//controllers
const campgrounds = require('../controllers/campgrounds');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

//******CAMPGROUND ROUTES******/

router.route('/')
//CRUD - READ | route for all names of the campgrounds
//CRUD - CREATE | route for submitting form (new add form)
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

//CRUD - CREATE | route for showing form (new add form)
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
// Campground details show route
// CRUD - UPDATE/EDIT | route for submitting form (edit form)
// CRUD - DELETE | delete a campground from the DB
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

//CRUD - UPDATE/EDIT | route for showing form (edit form)
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;