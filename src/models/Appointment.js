const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    barber_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    appointment_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    remarks: {
        type: String,
        required: false
    }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;