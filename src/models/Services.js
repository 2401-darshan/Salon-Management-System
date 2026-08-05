const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    service_name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const Services = mongoose.model('Services', ServicesSchema);

module.exports = Services;