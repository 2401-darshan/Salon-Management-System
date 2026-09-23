const Service = require("../models/Service");

// POST service
const createService = async (req, res) => {
    try {
        const { service_name, duration, price, description } = req.body;

        if (!service_name || duration === undefined || price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Service name, duration and price are required."
            });
        }

        const service = await Service.create({
            service_name,
            duration,
            price,
            description
        });

        return res.status(201).json({
            success: true,
            message: "Service created successfully.",
            data: service
        });

    } catch (err) {

        if (err.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// GET ALL services
const getAllServices = async (req, res) => {
    try {

        const services = await Service.find()
            .sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            message: "Services fetched successfully.",
            totalServices: services.length,
            data: services
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// GET Services BY ID
const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Service fetched successfully.",
            data: service
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// PUT Service
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { service_name, duration, price, description } = req.body;

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        if (service_name !== undefined) {
            service.service_name = service_name;
        }

        if (duration !== undefined) {
            service.duration = duration;
        }

        if (price !== undefined) {
            service.price = price;
        }

        if (description !== undefined) {
            service.description = description;
        }

        const updatedService = await service.save();

        return res.status(200).json({
            success: true,
            message: "Service updated successfully.",
            data: updatedService
        });

    } catch (error) {

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// DELETE Service
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        await Service.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Service deleted successfully."
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = { createService, getAllServices, getServiceById, updateService, deleteService };