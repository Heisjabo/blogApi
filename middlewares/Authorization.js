import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const Authorization = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "You are not logged in please login to continue.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const loggedUser = await User.findById(decoded.id);
    if (!loggedUser) {
      return res.status(401).json({
        status: "failed",
        message: "Token has expired please login again",
      });
    }
    req.user = loggedUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      error:
        error.message +
        " token has expired please login again",
    });
  }
};