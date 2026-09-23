const Barber = require("../models/Barbers");
const User = require("../models/User");

// POST Barber
const createBarber = async (req, res) => {
    try {
        const {
            user_id,
            specialization,
            commission_percentage,
            joining_date
        } = req.body;

        if (!user_id || commission_percentage === undefined || !joining_date) {
            return res.status(400).json({
                success: false,
                message: "User_id, commission_percentage, and joining_date are required."
            });
        }

        // Check whether user exists or not
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.role !== "Barber") {
            return res.status(400).json({
                success: false,
                message: "Selected user does not have Barber role."
            });
        }

        const existingBarber = await Barber.findOne({ user_id });

        if (existingBarber) {
            return res.status(400).json({
                success: false,
                message: "This user already has a barber profile."
            });
        }

        if (commission_percentage < 0 || commission_percentage > 100) {
            return res.status(400).json({
                success: false,
                message: "Commission percentage must be between 0 and 100."
            });
        }

        const barber = await Barber.create({
            user_id,
            specialization,
            commission_percentage,
            joining_date
        });

        return res.status(201).json({
            success: true,
            message: "Barber created successfully.",
            data: barber
        });

    } catch (err) {

        if (err.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// GET ALL Barbers
const getAllBarbers = async (req, res) => {
    try {
        const barbers = await Barber.find()
            .sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            message: "Barbers fetched successfully.",
            totalBarbers: barbers.length,
            data: barbers
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// GET Barber By ID
const getBarberById = async (req, res) => {
    try {
        const { id } = req.params;

        const barber = await Barber.findById(id);

        if (!barber) {
            return res.status(404).json({
                success: false,
                message: "Barber not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Barber fetched successfully.",
            data: barber
        });

    } catch (err) {

        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid barber ID."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error."
        });
    }
};

// UPDATE Barber
const updateBarber = async (req, res) => {
    try {
        const { id } = req.params;

        const { user_id, specialization, commission_percentage, joining_date } = req.body;

        const barber = await Barber.findById(id);

        if (!barber) {
            return res.status(404).json({
                success: false,
                message: "Barber not found."
            });
        }

        // If user_id is changed
        if (user_id !== undefined) {

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found."
                });
            }

            if (user.role !== "Barber") {
                return res.status(400).json({
                    success: false,
                    message: "Selected user does not have Barber role."
                });
            }

            const existingBarber = await Barber.findOne({
                user_id,
                _id: { $ne: id }
            });

            if (existingBarber) {
                return res.status(400).json({
                    success: false,
                    message: "This user already has another barber profile."
                });
            }

            barber.user_id = user_id;
        }

        if (specialization !== undefined) {
            barber.specialization = specialization;
        }

        if (commission_percentage !== undefined) {
            if (commission_percentage < 0 || commission_percentage > 100) {
                return res.status(400).json({
                    success: false,
                    message: "Commission percentage must be between 0 and 100."
                });
            }

            barber.commission_percentage = commission_percentage;
        }

        if (joining_date !== undefined) {
            barber.joining_date = joining_date;
        }

        const updatedBarber = await barber.save();

        return res.status(200).json({
            success: true,
            message: "Barber updated successfully.",
            data: updatedBarber
        });

    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid barber ID."
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// DELETE Barber
const deleteBarber = async (req, res) => {
    try {
        const { id } = req.params;

        const barber = await Barber.findById(id);

        if (!barber) {
            return res.status(404).json({
                success: false,
                message: "Barber not found."
            });
        }

        const removedBarber = await Barber.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Barber deleted successfully.",
            data: removedBarber
        });

    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid barber ID."
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = { createBarber, getAllBarbers, getBarberById, updateBarber, deleteBarber };