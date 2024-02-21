const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
const viewEngine = require("./config/viewEngine");
let port = 3001;
dotenv.config();
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(morgan("combined"));
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb', extended: true}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
routes(app);
mongoose
    .connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log("Connect successfully");
    })
    .catch((err) => {
        console.log(err);
    });
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
