const authService = require("../services/authService");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        res.status(200).json(result);

    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};

const logout = async (req, res) => {
    try {
        const result = await authService.logout();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const result = await authService.changePassword(
            req.user.id,
            oldPassword,
            newPassword
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = { login, logout, changePassword };