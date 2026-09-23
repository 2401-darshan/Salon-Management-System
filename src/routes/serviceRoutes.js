const express = require("express");

const router = express.Router();

const { createService, getAllServices, getServiceById, updateService, deleteService } = require("../controllers/serviceController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createService);
router.get("/", authMiddleware, getAllServices);
router.get("/:id", authMiddleware, getServiceById);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;