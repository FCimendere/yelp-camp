
//..storing the user current route before login
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

//..control the user authentication to log in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; 
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

