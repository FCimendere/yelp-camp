const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');
const { storeReturnTo } = require('../middelware');
const users = require('../controllers/users');

// user register form render route
router.get('/register', users.renderRegister);

// user register form submit route
router.post('/register', catchAsync(users.register));

// user login form render route
router.get('/login', users.renderLogin);

//user login form submit and authentication control route
router.post('/login', 
storeReturnTo, 
passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), 
users.login);

// user logout route
router.get('/logout', users.logout);

module.exports = router;