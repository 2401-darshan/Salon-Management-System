const mongoose = require('mongoose');

const BarbersSchema = new mongoose.Schema(
{
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    specialization: {
        type: String,
        default: null
    },
    commission_percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    joining_date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Barbers = mongoose.model('Barbers', BarbersSchema);

module.exports = Barbers;