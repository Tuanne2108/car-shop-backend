const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        phone: { type: Number },
        access_token: { type: String, require: true },
        refresh_token: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
