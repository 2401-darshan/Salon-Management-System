// const bcrypt = require("bcrypt");
// require("dotenv").config();

// const connectDB = require("./src/config/db");
// const User = require("./src/models/User");

// const seedAdmin = async () => {
//     try {
//         await connectDB();

//         const existingAdmin = await User.findOne({
//             email: "darshan@admin.com"
//         });

//         if (existingAdmin) {
//             console.log("Admin already exists.");
//             return;
//         }

//         const adminPassword = await bcrypt.hash("Darshanbhai", 10);

//         await User.create({
//             name: "Administrator",
//             email: "darshan@admin.com",
//             password: adminPassword,
//             role: "Administrator",
//             status: "Active"
//         });

//         console.log("Admin created successfully.");

//     } catch (err) {
//         console.error(err);
//     }
// };

// seedAdmin();