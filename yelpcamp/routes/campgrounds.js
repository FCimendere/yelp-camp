const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError'); 
const Campground = require('../models/campground');
const {campgroundSchema} = require('../schemas.js');



//JOI server side data validator middelware for Campground
const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else{
        next();
    }
}

//CRUD - READ | route for all names of the campgrounds
router.get('/', async (req,res)=> {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})

//CRUD - CREATE | route for showing form (new add form)
router.get('/new', (req,res) => {
    res.render('campgrounds/new');
})

//CRUD - CREATE | route for submitting form (new add form)
router.post('/', validateCampground, catchAsync(async (req, res,next) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400)
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}))


// Campground details show route
router.get('/:id', catchAsync(async(req,res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    // first way to show flash onto screen
    //res.render('campgrounds/show', {campground, msg: req.flash('success')});
    //better way to show flash onto screen - with middelware
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}))

//CRUD - UPDATE/EDIT | route for showing form (edit form)
router.get('/:id/edit', catchAsync(async (req,res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground})
}))

//CRUD - UPDATE/EDIT | route for submitting form (edit form)
router.put('/:id', validateCampground, catchAsync(async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}))

//CRUD - DELETE | delete a campground from the DB
router.delete('/:id', catchAsync(async (req,res)=> {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds');
}))

module.exports = router;