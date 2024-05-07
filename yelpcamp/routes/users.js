const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');
const { storeReturnTo } = require('../middelware');
const users = require('../controllers/users');


router.route('/register')
// user register form render route
// user register form submit route
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
// user login form render route
//user login form submit and authentication control route
    .get(users.renderLogin)
    .post(storeReturnTo, 
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), 
        users.login)

// user logout route
router.get('/logout', users.logout);

module.exports = router;