const Customer = require("../models/Customer");
const mongoose = require("mongoose");

const createCustomer = async (req, res) => {
    try {
        const { name, phone, email, gender } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name and Phone are required.",
            });
        }

        const existingCustomer = await Customer.findOne({ phone });

        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: "Customer already exists with this phone number.",
            });
        }

        const customer = await Customer.create({
            name,
            phone,
            email,
            gender,
        });

        return res.status(201).json({
            success: true,
            message: "Customer created successfully.",
            data: customer,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const getAllCustomers = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const searchFilter = {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } }
            ]
        };

        const customers = await Customer.find(searchFilter)
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(limit);

        const totalCustomers = await Customer.countDocuments(searchFilter);

        return res.status(200).json({
            success: true,
            message: "Customers fetched successfully.",
            totalCustomers,
            currentPage: page,
            totalPages: Math.ceil(totalCustomers / limit),
            data: customers
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getCustomerById = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer ID."
            });
        }

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customer fetched successfully.",
            data: customer
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const updateCustomer = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, phone, email, gender } = req.body;

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found."
            });
        }

        // Check if phone belongs to another customer
        if (phone) {

            const existingCustomer = await Customer.findOne({ phone });

            if (existingCustomer && existingCustomer._id.toString() !== id) {
                return res.status(400).json({
                    success: false,
                    message: "Phone number already exists."
                });
            }

        }

        customer.name = name || customer.name;
        customer.phone = phone || customer.phone;
        customer.email = email || customer.email;
        customer.gender = gender || customer.gender;

        await customer.save();

        return res.status(200).json({
            success: true,
            message: "Customer updated successfully.",
            data: customer
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteCustomer = async (req, res) => {

    try {

        const { id } = req.params;

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found."
            });
        }

        await Customer.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Customer deleted successfully."
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};