const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['Administrator', 'Receptionist', 'Barber']
        },
        status: {
            type: String,
            default: 'Active',
            enum: ['Active', 'Inactive']
        }
    }, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;