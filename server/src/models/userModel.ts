import mongoose, { Document } from "mongoose";

export interface IUser{
    fullname: string;
    email: string;
    password: string;
    contact: string;
    address: string;
    city: string;
    country: string;
    profilePicture: string;
    admin: boolean;
    lastLogin?: Date;
    isVerified?: boolean;
    resetPasswordToken?: string;
    resetPasswordTokenExpiry?: Date;
    verificationToken?: string;
    verificationTokenExpiry?: Date;
}

export interface IUserDocument extends IUser, Document {
    updatedAt: Date;
    createdAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>({
    fullname:{
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
    contact:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        default:"Update your address",
    },
    city:{
        type: String,
        default: "Update your city",
    },
    country:{
        type: String,
        default: "Update your country",
    },
    profilePicture:{
        type: String
    },
    admin:{
        type: Boolean,
        default: false,
    },
    lastLogin:{
        type: Date,
        default: Date.now,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
    verificationToken: String,
    verificationTokenExpiry: Date,

},{timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;
