const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');
const { storeReturnTo } = require('../middelware');

// user registration routing
router.get('/register', (req,res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async(req,res) => {
    try {
        const {email, password, username} = req.body;
        const user = new User({email,username});
        const registeredUser = await User.register(user,password);
        //after register, using user info to login automatically
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to YelpCamp');
            res.redirect('/campgrounds');
        })   
    } catch (e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

// user loging in routing
router.get('/login', (req,res) => {
    res.render('users/login');
})

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), async(req,res) => {
    req.flash('success','Welcome Back!');
    //redirect user the page bafore logged in or campgrounds
    const redirectUrl = res.locals.returnTo || '/campgrounds'; 
    res.redirect(redirectUrl);
})

// user logout routing
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
});

module.exports = router;