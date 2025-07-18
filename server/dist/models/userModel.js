import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        default: "Update your address",
    },
    city: {
        type: String,
        default: "Update your city",
    },
    country: {
        type: String,
        default: "Update your country",
    },
    profilePicture: {
        type: String,
    },
    admin: {
        type: Boolean,
        default: false,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
    verificationToken: String,
    verificationTokenExpiry: Date,
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;
