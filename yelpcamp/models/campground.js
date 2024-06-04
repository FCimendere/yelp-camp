// DB model and Schema Creation

const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

// setting up a virtual property
// url: 'https://res.cloudinary.com/dsbhzm1ku/image/upload/w_300/v1717416750/yelpcamp/qi1zkdvlnv6omkarfep8.jpg'

const ImageSchema = new Schema({
        url: String,
        filename: String
    });

ImageSchema.virtual('thumbnail').get(function () {
    //this could be regular expressions
    return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema ({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: 
        {
            type: Schema.Types.ObjectId,
            ref:'User'
        },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});

//deleting campground with all related reviews 
CampgroundSchema.post('findOneAndDelete', async function(doc){
    if (doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);