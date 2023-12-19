import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import UserVerification from "../models/userVerification.js";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "../helpers/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

// creating a user

const mail_from = process.env.MAIL_USERNAME;

export const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).json({
        status: "failed",
        message: "Email has already been registered",
      });
    }

    let newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });

    const token = uuidv4();
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 6);
    const user_id = newUser._id;

    let verification = await UserVerification.create({
      token: token,
      userId: newUser._id,
      expiresIn: expiresIn,
    });

    await verification.save();

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #007BFF;
            color: #fff;
            padding: 5px 0;
            text-align: center;
        }
        .content {
            background-color: #fff;
            padding: 20px;
        }
        .button {
            text-align: center;
            margin-top: 20px;
        }
        .button a {
            display: inline-block;
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
        }
        .footer {
            background-color: #007BFF;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <h2>Dear ${newUser.username}</h2>
            <p>Thanks for signing up with us!</p>
            <p>Click the following link to verify your email address:</p>
            <div class="button">
                <a href="${`${req.hostname}/api/v1/users/verify/${user_id}/${token}`}">Verify Email</a>
            </div>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} by Jabo with 🤍
        </div>
    </div>
</body>
</html>
`;

    sendEmail(mail_from, newUser.email, "Email Verification", html);

    return res.status(200).json({
      status: "success",
      message: "Please verify your email address to continue to your account",
      verification_link: `${req.hostname}/api/v1/verify/${user_id}/${token}`,
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// user authorisation

export const authUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "user not found",
      });
    }
    if (user.password !== req.body.password) {
      return res.status(401).json({
        status: "failed",
        message: "incorrect password",
      });
    }

    return res.status(200).json({
      token: await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      }),
      status: "success",
      user,
    });
  } catch (error) {
    res.status(error.status).json({ error: error.message });
    console.log(error);
  }
};

// get all users

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user a specific user

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error("User not found");
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update user

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) throw Error("User not found");
    res.json({
      status: "success: user updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete user

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw Error("User not found");
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
