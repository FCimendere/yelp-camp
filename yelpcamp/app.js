const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError'); 
const { reset } = require('nodemon');
const { request } = require('http');
const methodOverride = require('method-override');



const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

const mongoUrl = 'mongodb://127.0.0.1:27017/yelp-camp';

//MongoDB connection
mongoose.connect(mongoUrl);

//DB connection check
const db =mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database Connected');
});

const app = express();


// Setting for ejs engine
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))

//session configuration
const sessionConfig = {
    secret: 'SimpleSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use((req,res,next) => {
    res.locals.success = req.flash('success');
    next();
})

//routes 
app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req,res)=> {
    res.render('home')
})

app.all('*', (req,res,next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err,req,res,next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something went wrong baby!'
    res.status(statusCode).render('error', {err});
})

//Server Listen
app.listen(3000, () => {
    console.log('Serving on port 3000')
})