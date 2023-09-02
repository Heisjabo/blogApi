import express from "express";
import {
  createUser,
  authUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "./controllers/userController";

const router = express.Router();

// create user

router.post('/users', createUser);
router.post('/users/login', authUser);

// get all users

router.get("/users", getUsers);

// get user by id

router.get("/users/:id", getUserById);

// update user

router.put("users/:id", updateUser);

// delete user

router.delete("/users/:id", deleteUser);

export default router;