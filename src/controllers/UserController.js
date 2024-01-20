const { refreshTokenJwtService } = require("../services/JwtService");
const userService = require("../services/UserService");

class UserController {
    async createUser(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body;
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let isCheckedMail = mailformat.test(email);
            if (!isCheckedMail) {
                return res.status(200).json({
                    status: "ERR",
                    message: "The email is invalid!",
                });
            } else if (password !== confirmPassword) {
                return res.status(200).json({
                    status: "ERR",
                    message: "Passwords do not match!",
                });
            }
            console.log("isCheckedMail", isCheckedMail);
            const response = await userService.createUser(req.body);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }

    async logInUser(req, res) {
        try {
            const { email, password } = req.body;
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let isCheckedMail = mailformat.test(email);
            if (!email || !password) {
                return res.status(200).json({
                    status: "ERR",
                    message: "The input is required",
                });
            } else if (!isCheckedMail) {
                return res.status(200).json({
                    status: "ERR",
                    message: "The email is invalid",
                });
            }
            console.log("isCheckedMail", isCheckedMail);
            const response = await userService.logInUser(req.body);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const data = req.body;
            if (!userId) {
                return res.status(200).json({
                    status: "FAILURE",
                    message: "The user ID is required",
                });
            }
            const response = await userService.updateUser(userId, data);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const token = req.headers;
            const response = await userService.deleteUser(userId);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }
    async getAllUser(req, res) {
        try {
            const response = await userService.getAllUser();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }
    async getUserDetails(req, res) {
        try {
            const userId = req.params.id;
            const response = await userService.getUserDetails(userId);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }
    async refreshToken(req, res) {
        try {
            const token = req.headers.token.split(" ")[1];
            if (!token) {
                return res.status(404).json({
                    message: "The token is required",
                    status: "error",
                });
            }
            const response = await refreshTokenJwtService(token);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }
}

module.exports = new UserController();
