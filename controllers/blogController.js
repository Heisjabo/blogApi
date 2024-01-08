import Blog from "../models/blogsModel.js";
import { uploadFile } from "../helpers/upload.js";
import { Comment } from "../models/blogsModel.js";

// create blog

export const createBlog = async (req, res) => {
    try{
        const result = await uploadFile(req.file, res);
        const newBlog = await Blog.create({
          title: req.body.title,
          description: req.body.description,
          image: result.secure_url,
        });

        return res.status(200).json({
          status: "success",
          message: "Blog was created successfully",
          content: {
            newBlog,
          },
        });
    } catch(error){
        return res.status(400).json({
          status: "failed",
          error: error.message,
        });
    }
    
}

// get all blogs

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({
      status: "success",
      blogs,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      error: error.message,
    });
  }
};

// update a blog

export const updateBlog = async (req, res) => {
  try {
    console.log("Entering updateBlog");
    const id = req.params.id;
    // Check if an image file is uploaded
    if (req.file) {
      const result = await uploadFile(req.file, res);
      console.log("Result:", result.secure_url);

      const blog = await Blog.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description,
        image: result.secure_url,
      });
      console.log("Blog:", blog);
    } else {
      // No image file in the request, update title and description if provided
      const updateFields = {
        title: req.body.title,
        description: req.body.description,
      };
      const blog = await Blog.findByIdAndUpdate(id, updateFields);
      console.log("Blog:", blog);
    }

    return res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
    });
    
  } catch (error) {
    console.log("Error:", error);
    return res.status(400).json({
      status: "failed",
      error: error.message,
    });
  }
};


// delete blog

export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(400).json({
        status: "failed",
        message: "blog not found",
      });
    }
    return res.status(204).json({
      status: "success",
      message: "blog deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error,
    });
  }
};

// get blog by id 

export const getBlogById = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            return res.status(400).json({
                status: "failed",
                message: "blog not found"
            });
        }

        return res.status(200).json({
            status: "success",
            blog
        })
    } catch(error){
        return res.status(400).json({
            status: "failed",
            error
        })
    }
}

// comments

export const addComment = async (req, res) => {
  const { blogId } = req.params;
  const { text, user } = req.body;

  try {
      const blog = await Blog.findById(blogId);

      if (!blog) {
          return res.status(404).json({ message: "Blog not found" });
      }

      const newComment = { text, user };
      blog.comments.push(newComment);
      
      await blog.save();

      res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
      res.status(500).json({ message: "Error adding comment", error: error.message });
  }
};
