const mongoose = require('mongoose');

const { Schema } = mongoose;

/*
- Title - Text
- Description - Text
- Rating --> scale of 1-10
- Image(s) - Text - URL
- Start Date of Visit - DateTime
- End Date of Visit - DateTime
- Latitude - Number
- Longitude - Number
- Created at - DateTime
- Updated at - DateTime 
*/

const requiredString = {
    type: String,
    required: true
};

const requiredNumber = {
    type: Number,
    required: true
};


const logEntrySchema = new Schema({
    title: requiredString,
    visitDate: {
        type: Date,
        required: true
    },
    description: requiredString,
    author: requiredString,
    rating: {
        type: Number, 
        min: 0, 
        max: 10,
        default: 0,
        required: true
    },
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90,
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180,
    },
    image: requiredString,
    comments: [{body: String, date: Date}]
    }, 
    { timestamps: true }
);

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;