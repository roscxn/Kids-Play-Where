const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  content: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 100
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
});

const locationSchema = new Schema({
    locationName: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 200
    },
    locationType: {
        type: String,
        required: true,
        enum: ["Playground", "Pool"]
    },
    address: { 
        type: String, 
        required: true,
        unique: true,
        minLength: 8,
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
        minLength: 8,
        maxLength: 500, 
        required: true,
        unique: true,
    },
    website: {
        type: String,
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
        required: true,
        unique: true,
    },
    ageGroup: {
        type: [String],
        required: true,
        enum: ["0-2", "2-4", "4-6", "6-8"]
    },
    latitude: { 
        type: Number, 
        unique: true, 
        required: true,
        validate: {
            validator: function(value) {
                return value >= 1.15 && value <= 1.49;
            },
            message: 'Latitude must be between 1.15 and 1.49 degrees.'
        }
    }, 
    longitude: { 
        type: Number, 
        unique: true, 
        required: true,
        validate: {
            validator: function(value) {
                return value >= 103.58 && value <= 104.09;
            },
            message: 'Longitude must be between 103.58 and 104.09 degrees.'
        }
    },
    postalCode: { 
        type: String, 
        minLength: 6,
        maxLength: 6,
        unique: true, 
        required: true,
        match: /^\d{6}$/
    },
    reviews: [reviewSchema],
}, { 
    timestamps: true, 
});


module.exports = mongoose.model('Location', locationSchema);