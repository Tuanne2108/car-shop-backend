const User = require("../models/UserModel");

let createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmedPassword, phone } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null)
                resolve({
                    status: "OK",
                    message: "The email is already exist",
                });
            const createdUser = await User.create({
                name,
                email,
                password,
                confirmedPassword,
                phone,
            });
            if (createUser) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdUser,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { createUser };
