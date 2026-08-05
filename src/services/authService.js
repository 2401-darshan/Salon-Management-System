const authRepository = require("../repositories/authRepository");
const { comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");
const { hashPassword } = require("../utils/password");

const login = async (email, password) => {

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (user.status !== "Active") {
        throw new Error("User account is inactive");
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    return {
        message: "Login Successful",
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

const logout = async () => {
    return {
        message: "Logout Successful"
    };
}

const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await authRepository.findUserById(userId);

    if(!user) {
        throw new Error("User not found");
    }

    const isMatch = await comparePassword(oldPassword, user.password);

    if(!isMatch) {
        throw new Error("Old password is incorrect");
    }

    const hashedPassword = await hashPassword(newPassword);

    await authRepository.updatePassword(userId, hashedPassword);

    return {
        message: "Password changed successfully"
    }
}
module.exports = { login, logout, changePassword };