const Appointment = require("../models/Appointment");

// CREATE APPOINTMENT
const createAppointment = async (req, res) => {
  try {
    const { customer_id, barber_id, service_id, appointment_date, status, remarks } = req.body;

    if ( !customer_id || !barber_id || !service_id || !appointment_date ) {
      return res.status(400).json({
        success: false,
        message: "customer_id, barber_id, service_id and appointment_date are required"
      });
    }

    const existingAppointment = await Appointment.findOne({
      barber_id,
      appointment_date: new Date(appointment_date),
      status: { $ne: "Cancelled" },
    });

    if (existingAppointment) {
      return res.status(409).json({
        success: false,
        message: "Barber already has an appointment at this time",
      });
    }

    const appointment = await Appointment.create({
      customer_id,
      barber_id,
      service_id,
      appointment_date,
      status: status || "Pending",
      remarks,
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("customer_id")
      .populate("barber_id")
      .populate("service_id");

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: populatedAppointment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

// GET APPOINTMENTS
const getAppointments = async (req, res) => {
  try {
    const { customer_id, barber_id, service_id, status, date } = req.query;

    const filter = {};

    if (customer_id) {
      filter.customer_id = customer_id;
    }

    if (barber_id) {
      filter.barber_id = barber_id;
    }

    if (service_id) {
      filter.service_id = service_id;
    }

    if (status) {
      filter.status = status;
    }

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      filter.appointment_date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const appointments = await Appointment.find(filter)
      .populate("customer_id")
      .populate("barber_id")
      .populate("service_id")
      .sort({ appointment_date: 1 });

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      count: appointments.length,
      data: appointments,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};

// GET APPOINTMENT by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("customer_id")
      .populate("barber_id")
      .populate("service_id");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointment",
      error: error.message,
    });
  }
};

// UPDATE APPOINTMENT
const updateAppointment = async (req, res) => {
  try {
    const { customer_id, barber_id, service_id, appointment_date, status, remarks } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (customer_id !== undefined) {
      appointment.customer_id = customer_id;
    }

    if (barber_id !== undefined) {
      appointment.barber_id = barber_id;
    }

    if (service_id !== undefined) {
      appointment.service_id = service_id;
    }

    if (appointment_date !== undefined) {
      appointment.appointment_date = appointment_date;
    }

    if (status !== undefined) {
      appointment.status = status;
    }

    if (remarks !== undefined) {
      appointment.remarks = remarks;
    }

    await appointment.save();

    const updatedAppointment = await Appointment.findById(appointment._id)
      .populate("customer_id")
      .populate("barber_id")
      .populate("service_id");

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: updatedAppointment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update appointment",
      error: error.message,
    });
  }
};

// DELETE APPOINTMENT
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete appointment",
      error: error.message,
    });
  }
};


module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};