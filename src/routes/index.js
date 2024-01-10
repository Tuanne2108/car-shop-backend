const homeRouter = require("./home");
const userRouter = require("./user")
const productRouter = require("./product")
const routes = (app) => {
    app.use("/product", productRouter)
    app.use("/user", userRouter)
    app.use("/", homeRouter);
};

module.exports = routes;
