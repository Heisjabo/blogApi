import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comments: [commentSchema]
});


const Blog = mongoose.model("Blog", blogSchema);

export const Comment = mongoose.model("Comment", commentSchema);

export default Blog;
