const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Administrator', 'Receptionist', 'Barber']
    },
    gender: {
        type: String,
        required: true,
        default: 'Male',
        enum: ['Male', 'Female', 'Other']
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;