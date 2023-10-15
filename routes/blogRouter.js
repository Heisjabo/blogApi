import express from "express";
import {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
    getBlogById
} from "../controllers/blogController.js";
import upload from "../helpers/multer.js";

const router = express.Router();

// create blog

router.post("/blogs",upload.single("image"), createBlog);

// get all blogs

router.get("/blogs", getAllBlogs);

// get blog by id

router.get("/blogs/:id", getBlogById);

// update blog

router.put("/blogs/:id",upload.single("image"), updateBlog);

// delete blog

router.delete("/blogs/:id", deleteBlog);

/**
 * @swagger
 * /api/v1/blogs:
 *   get:
 *     summary: Get all blog posts
 *     description: Retrieve all blog posts from the database.
 *     responses:
 *       200:
 *         description: A list of all blog posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the request.
 *                 number:
 *                   type: number
 *                   description: The number of blog posts returned.
 *                 blogs:
 *                   type: array
 *       404:
 *         description: Failed to retrieve blog posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the request.
 *                 error:
 *                   type: string
 *                   description: The error message.
 */

/**
 * @swagger
 * /api/v1/blogs:
 *   post:
 *     summary: Creates a blog post
 *     description: Upload a blog post with title, description, and an optional image.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: title
 *         in: formData
 *         type: string
 *         required: true
 *         description: The title of the blog post.
 *       - name: description
 *         in: formData
 *         type: string
 *         required: true
 *         description: The description of the blog post.
 *       - name: image
 *         in: formData
 *         type: file
 *         required: false
 *         description: The image to be uploaded (optional).
 *     responses:
 *       '201':
 *         description: Blog created
 *       '200':
 *         description: Success
 *       '403':
 *         description: Blog creation failed
 */


export default router;