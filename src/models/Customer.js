const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: null
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            default: null
        }
    },
    {
        timestamps: true
    });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;