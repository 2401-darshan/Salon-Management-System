const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
    service_name: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: false,
        trim: true
    }
}, {
    timestamps: true
});

const Service = mongoose.model('Service', ServicesSchema);

module.exports = Service;