const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userName: String,
  content: String,
  rating: {
    type: Number,
    default: 5
  }
});

module.exports = mongoose.model('Review', reviewSchema);

const locationSchema = new Schema({
    locationName: {
        type: String,
        required: true,
        unique: true,
        maxLength: 200
    },
    locationType: {
        type: String,
        required: true,
        maxLength: 200
    },
    address: { 
        type: String, 
        required: true,
        unique: true,
        maxLength: 200 
    },
    image: { 
        type: String, 
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
        maxLength: 200, 
        required: true,
        unique: true,
    },
    description: { 
        type: String,
        maxLength: 500, 
        required: true,
        unique: true,
    },
    website: {
        type: String,
        required: true,
        unique: true,
    },
    ageGroup: {
        type: Array,
        required: true,
        unique: true,
    },
    latitude: { 
        type: Number, 
        unique: true, 
        required: true 
    }, 
    longitude: { 
        type: Number, 
        unique: true, 
        required: true 
    },
    postalCode: { 
        type: String, 
        unique: true, 
        required: true 
    },
    reviews: [reviewSchema],
    }, 
    { 
    timestamps: true, 
});

module.exports = mongoose.model('Location', locationSchema);