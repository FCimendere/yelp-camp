
const User = require('../models/user');


module.exports.renderRegister = (req,res) => {
    res.render('users/register');
}

module.exports.register = async(req,res) => {
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
}

module.exports.renderLogin = (req,res) => {
    res.render('users/login');
}

module.exports.login = async(req,res) => {
    req.flash('success','Welcome Back!');
    //redirect user the page bafore logged in or campgrounds
    const redirectUrl = res.locals.returnTo || '/campgrounds'; 
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}