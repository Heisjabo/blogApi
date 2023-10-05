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

router.post("/blogs", upload.single("image"), createBlog);

// get all blogs

router.get("/blogs", getAllBlogs);

// get blog by id

router.get("/blogs/:id", getBlogById);

// update blog

router.put("/blogs/:id",upload.single("image"), updateBlog);

// delete blog

router.delete("/blogs/:id", deleteBlog);

export default router;