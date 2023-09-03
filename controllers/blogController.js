import Blog from "../models/blogsModel";
import { uploadFile } from "../helpers/upload";


// create blog

const createBlog = async (req, res) => {
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
            newPost,
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
    const result = await uploadFile(req.file, res);
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(400).json({
        status: "failed",
        message: "blog not found",
      });
    }
    await BlogModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      image: result.secure_url,
    });

    return res.status(200).json({
      status: "success",
      message: "blog updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error.message,
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
