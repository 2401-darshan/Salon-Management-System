const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    barber_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date,
        required: false
    },
    date: {
        type: Date,
        required: true
    }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;