const express = require("express");
const router = express.Router();

const { createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer } = require("../controllers/customerController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createCustomer);

router.get("/", authMiddleware, getAllCustomers);

router.get("/:id", authMiddleware, getCustomerById);

router.put("/:id", authMiddleware, updateCustomer);

router.delete("/:id", authMiddleware, deleteCustomer);

module.exports = router;