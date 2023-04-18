const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    name: String,
    content: String,
    rating: Number
})

const locationSchema = new Schema({
    address: { 
        type: String, 
        required: true, 
        maxLength: 200 
    },
    image: { 
        type: String, 
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
        maxLength: 200, 
        required: true 
    },
    description: { 
        type: String,
        maxLength: 200, 
        required: true 
    },
    openingHours: {
        type: String,
        required: true
    },
    ageGroup: [{
        type: String,
        required: true
    }],
    fees: {
        type: String, 
        required: true
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
        type: Number, 
        unique: true, 
        required: true 
    },
    reviews: [reviewSchema],
    }, 
    { 
    timestamps: true, 
});

module.exports = mongoose.model('Location', locationSchema);