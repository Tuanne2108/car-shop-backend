const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

let createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null)
                resolve({
                    status: "OK",
                    message: "The email is already exist",
                });
            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                name,
                email,
                password: hash,
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
let logInUser = (userLoggedIn) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmedPassword, phone } =
            userLoggedIn;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null)
                resolve({
                    status: "OK",
                    message: "The user is not defined",
                });
            const comparePassword = bcrypt.compareSync(
                password,
                checkUser.password
            );
            if (!comparePassword) {
                resolve({
                    status: "FAILURE",
                    message: "Password or username is incorrect!",
                });
            }
            const access_token = await generalAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin,
            });
            const refresh_token = await generalRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin,
            });
            if (createUser) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    access_token,
                    refresh_token,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
let updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null)
                resolve({
                    status: "OK",
                    message: "The user is not defined",
                });
            const updatedUser = await User.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null)
                resolve({
                    status: "OK",
                    message: "The user is not defined",
                });
            await User.findByIdAndDelete(id);
            resolve({
                status: "OK",
                message: "Delete Successfully",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            resolve({
                status: "OK",
                message: "Successfully",
                data: allUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let getUserDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDetails = await User.findOne({ _id: id });
            if (userDetails === null)
                resolve({
                    status: "OK",
                    message: "The user is not defined",
                });
            resolve({
                status: "OK",
                message: "Successfully",
                data: userDetails,
            });
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    createUser,
    logInUser,
    updateUser,
    deleteUser,
    getAllUser,
    getUserDetails,
};
