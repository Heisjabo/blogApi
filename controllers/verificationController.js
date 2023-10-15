import UserVerification  from "../models/userVerification.js";
import User from "../models/userModel.js";

export const getUserVerifications = async (req, res) => {
    try {
        const verifications = await UserVerification.find();
        res.status(200).json({
            status: "success",
            verifications,
        });
    } catch (err){
        res.status(400).json({
            message: err.message
        });
    }
}

export const verifyUser = async (req, res) => {
    const { id, token } = req.params;
    try {
        const verification = await UserVerification.findOne({ userId: id, token });

        if (!verification) {
            return res.status(400).json({
                message: "Invalid verification link. Please check and try again.",
            });
        }
        const now = new Date();
        if (now > verification.expiresIn) {
            return res.status(400).json({
                message: "Verification link has expired. Please request a new one.",
            });
        }
        await User.updateOne({ _id: id }, { isVerified: true });
        await UserVerification.deleteOne({ _id: verification._id });

        return res.status(200).json({
            message: "Email verification successful. You can now log in.",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
