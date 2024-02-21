const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        phone: { type: Number },
        address: { type: String },
        avatar: { type: String },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
