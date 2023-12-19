import express from "express";
import {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
    getBlogById,
    addComment
} from "../controllers/blogController.js";
import { Authorization } from "../middlewares/Authorization.js";
import upload from "../helpers/multer.js";

const router = express.Router();
router.post("/blogs", Authorization, upload.single("image"), createBlog);
router.post("/comment/:blogId", addComment);
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id", Authorization, upload.single("image"), updateBlog);
router.delete("/blogs/:id", Authorization, deleteBlog);


/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - image
 *        properties:
 *           id:
 *             type: string
 *             description: The auto-generated id of the blog
 *           title:
 *              type: string
 *              description: The title of your blog
 *           description:
 *              type: string
 *              description: The blog explaination
 *           image:
 *              type: string
 *              description: The url of your blog image
 *           comments:
 *              type: array
 *              description: An array of blog comments
 */

/**
 * @swagger
 * /api/v1/blogs:
 *   get:
 *     summary: List all of the blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *        200:
 *          description: The created blog
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Blog'
 *        500:
 *          description: Internal server error 
 *
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Get a specific blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The specified blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *   put:
 *     summary: Update a specific blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The updated blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 *   delete:
 *     summary: Delete a specific blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */





export default router;