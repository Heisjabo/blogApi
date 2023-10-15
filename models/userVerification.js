import mongoose from "mongoose";

const userVerificationSchema = mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Date,
        required: true,
    },
});

const UserVerification = mongoose.model( "UserVerification", userVerificationSchema);

export default UserVerification;