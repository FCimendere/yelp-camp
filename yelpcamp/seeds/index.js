const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

const mongoUrl = 'mongodb://127.0.0.1:27017/yelp-camp';

mongoose.connect(mongoUrl);

const db =mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database Connected');
});

const sample =  array => array[Math.floor(Math.random() * array.length)];

//create 50 random places name
const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0 ; i < 50 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '6634e0181b8e182d691002bb',
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum vitae ad excepturi. Quia, sunt minima dolore hic exercitationem ex. Consectetur similique tenetur ab officia repellat quasi reiciendis doloribus fuga quam.',
            price,
            images: [
                {
                url: 'https://res.cloudinary.com/dsbhzm1ku/image/upload/v1717406967/yelpcamp/y6vqc8p0ecxm6wqo80q5.jpg',
                filename: 'yelpcamp/y6vqc8p0ecxm6wqo80q5',
                },
                {
                url: 'https://res.cloudinary.com/dsbhzm1ku/image/upload/v1717406969/yelpcamp/qgabybvbnoksh6jlse60.jpg',
                filename: 'yelpcamp/qgabybvbnoksh6jlse60'
                }
            ],

        })
        await camp.save();
    }
    
}

//Close DB connection 
seedDB().then(() => {
    mongoose.connection.close();
})