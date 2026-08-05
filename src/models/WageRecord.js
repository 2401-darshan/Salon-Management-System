const mongoose = require('mongoose');

const WageRecordSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    barber_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    month: {
        type: String,
        required: true,
        match: /^\d{4}-(0[1-9]|1[0-2])$/
    },
    salary: {
        type: Number,
        default: 0.00
    },
    commission: {
        type: Number,
        default: 0.00
    },
    total_amount: {
        type: Number,
        required: true
    }
});

const WageRecord = mongoose.model('WageRecord', WageRecordSchema);

module.exports = WageRecord;