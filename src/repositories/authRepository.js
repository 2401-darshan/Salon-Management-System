const Users = require("../models/User");

const findUserByEmail = async (email) => {
    return await Users.findOne({ email });
};

const findUserById = async (id) => {
    return await Users.findById(id);
};

const updatePassword = async (id, password) => {
    return await Users.findByIdAndUpdate(
        id,
        { password },
        { new: true }
    );
};

module.exports = {
    findUserByEmail,
    findUserById,
    updatePassword
};