import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: string,
        required: true
    },

    description: {
        type: string,
        required: true
    },

    image: {
        type: string,
        required: true
    }

});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;