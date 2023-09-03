import express from "express";
import {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
    getBlogById
} from "../controllers/blogController.js";

const router = express.Router();

// create blog

router.post("/blogs", createBlog);

// get all blogs

router.get("/blogs", getAllBlogs);

// get blog by id

router.get("/blogs/:id", getBlogById);

// update blog

router.put("/blogs/:id", updateBlog);

// delete blog

router.delete("blogs/:id", deleteBlog);

export default router;