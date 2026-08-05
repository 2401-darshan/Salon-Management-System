const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/AuthMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

router.post("/login", authController.login);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Authorized User",
        user: req.user
    });
})

router.get(
    "/admin",
    authMiddleware,
    authorizeRoles("Administrator"),
    (req, res) => {
        res.json({
            message: "Welcome Administrator"
        });
    }
)

router.post(
    "/logout",
    authMiddleware,
    authController.logout
);

router.put(
    "/change-password",
    authMiddleware,
    authController.changePassword
)

module.exports = router;