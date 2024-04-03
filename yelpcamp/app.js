const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const mongoUrl = 'mongodb://127.0.0.1:27017/yelp-camp';

mongoose.connect(mongoUrl);

const db =mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database Connected');
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res)=> {
    res.render('home')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})