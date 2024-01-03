const homeRouter = require("./home");
const userRouter = require("./user")
const routes = (app) => {
    app.use("/user", userRouter)
    app.use("/", homeRouter);
};

module.exports = routes;
