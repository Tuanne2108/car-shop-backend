const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenMiddleware = (req, res, next) => {
    const token = req.headers.token.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res
                .status(404)
                .json({ message: "Authentication!", status: "ERROR" });
        }
        // const { payload } = user;
        if (user?.isAdmin) {
            next();
        } else {
            return res
                .status(404)
                .json({ message: "Authentication!", status: "ERROR" });
        }
    });
};

const authenUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(" ")[1];
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res
                .status(404)
                .json({ message: "Authentication!", status: "ERROR" });
        }
        // const { payload } = user;
        if (user?.isAdmin || user?.id === userId) {
            next();
        } else {
            return res
                .status(404)
                .json({ message: "Authentication!", status: "ERROR" });
        }
    });
};

module.exports = { authenMiddleware, authenUserMiddleware };
