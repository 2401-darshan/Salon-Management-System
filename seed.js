const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const connectDB = require("./src/config/db");
const User = require("./src/models/User");

const seedUsers = async () => {
    try {
        await connectDB();

        // Delete existing users
        await User.deleteMany();

        // Hash passwords
        const adminPassword = await bcrypt.hash("admin123", 10);
        const receptionistPassword = await bcrypt.hash("receptionist123", 10);
        const barberPassword = await bcrypt.hash("barber123", 10);

        await User.insertMany([
            {
                id: 1,
                name: "Administrator",
                email: "admin@salon.com",
                password: adminPassword,
                role: "Administrator",
                status: "Active"
            },
            {
                id: 2,
                name: "Receptionist",
                email: "reception@salon.com",
                password: receptionistPassword,
                role: "Receptionist",
                status: "Active"
            },
            {
                id: 3,
                name: "Barber",
                email: "barber@salon.com",
                password: barberPassword,
                role: "Barber",
                status: "Active"
            }
        ]);

        console.log("Users added successfully.");

    } catch (err) {
        console.error(err);
    }
};

seedUsers();