import express from "express";
import {
  createUser,
  authUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { getUserVerifications, verifyUser } from "../controllers/verificationController.js";

const router = express.Router();

router.post('/users', createUser);
router.post('/users/login', authUser);
router.get("/users", getUsers);
router.get("/users/verify", getUserVerifications);
router.put("/verify/:id/:token", verifyUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         phone:
 *           type: string
 *           description: The user phone number
 * 
 * tags:
 *   - name: Users
 *     description: API endpoints for User management
 * 
 * paths:
 *   /api/v1/users:
 *     post:
 *       summary: Create a new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: The created user
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *     get:
 *       summary: Get all users
 *       tags: [Users]
 *       responses:
 *         200:
 *           description: The list of users
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 * 
 *   /api/v1/users/login:
 *     post:
 *       summary: Authenticate a user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email address of the user
 *                 password:
 *                   type: string
 *                   description: The password of the user
 *       responses:
 *         200:
 *           description: User authenticated successfully
 *         401:
 *           description: Unauthorized
 * 
 *   /api/v1/users/{id}:
 *     get:
 *       summary: Get a specific user by ID
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the user to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: The specified user
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         404:
 *           description: User not found
 *     put:
 *       summary: Update a specific user by ID
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the user to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: The updated user
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         404:
 *           description: User not found
 * 
 *     delete:
 *       summary: Delete a specific user by ID
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the user to delete
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: User deleted successfully
 *         404:
 *           description: User not found
 * 
 *   /api/v1/verify/{id}/{token}:
 *     put:
 *       summary: Verify a user
 *       tags: [Users]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the user to verify
 *           schema:
 *             type: string
 *         - in: path
 *           name: token
 *           required: true
 *           description: The verification token
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: User verified successfully
 *         404:
 *           description: User not found
 * 
 *   /api/v1/users/verify:
 *     get:
 *       summary: Get user verifications
 *       tags: [Users]
 *       responses:
 *         200:
 *           description: The list of user verifications
 * 
 */


export default router;