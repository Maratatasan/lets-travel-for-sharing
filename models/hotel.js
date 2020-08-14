const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotel_name: {
        type: String,
        // required could also be a boolean value, otherwise the string will appear as a message
        required: 'Hotel name is required',
        // length of the string
        max: 32,
        // trim will remove white spaces from beginning and end
        trim: true,
    },
    hotel_description: {
        type: String,
        required: 'Hotel description is required',
    },
    image: String,
    star_rating: {
        type: Number,
        required: 'Hotel star rating is required',
        max: 5
    },
    country: {
        type: String,
        required: 'Country is required',
        trim: true
    },
    cost_per_night: {
        type: Number,
        required: 'Cost per night is required'
    },
    available: {
        type: Boolean,
        required: 'Availability is required'
    }
});

// Export model
module.exports = mongoose.model('hotel', hotelSchema)
