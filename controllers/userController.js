import jwt from "jsonwebtoken";
import User from "./models/userModel";

// creating a user 

export const createUser = async (req, res) => {
    console.log(req.body);
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(409).json({
                status: "failed",
                message: "Email has already been registered"
            });
        }

        let newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        });
    } catch (error){
        res.status(400).json({message: error.message});
    }
};

// user authorisation

export const authUser = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(401).json({
                status: "failed",
                message: "user not found"
            });
        }
        if(user.password !== req.body.password){
            return res.status(401).json({
                status: "failed",
                message: "incorrect password"
            });
        }

        return res.status(200).json({
          token: await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          }),
          status: "success",
          user,
        });


    } catch(error){
        res.status(error.status).json({error: error.message});
        console.log(error);
    }
}

// get all users

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

// get user a specific user

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) throw Error("User not found");
        res.json(user);
    } catch(error){
        res.ststus(404).json({message: error.message});
    }
};

// update user

export const updateUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!user) throw Error("User not found");
        res.json(user);
    } catch(error){
        res.status(400).json({message: error.message});
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