const express = require("express");

const router = express.Router();

const { createBarber, getAllBarbers, getBarberById, updateBarber, deleteBarber } = require("../controllers/barberController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createBarber);
router.get("/", authMiddleware, getAllBarbers);
router.get("/:id", authMiddleware, getBarberById);
router.put("/:id", authMiddleware, updateBarber);
router.delete("/:id", authMiddleware, deleteBarber);

module.exports = router;