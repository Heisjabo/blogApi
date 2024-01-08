import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    
    isVerified: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model("User", userSchema);

export default User;