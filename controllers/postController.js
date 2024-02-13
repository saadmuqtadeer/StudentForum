import postModel from "../models/postModel.js";
import Comment from "../models/commentModel.js";

export const postController = async (req, res) => {
  try {
    const { title, description, postBy, institute, field } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Title and description are required",
        });
    }
    const existingPost = await postModel.findOne({ title }); // Await the result of findOne
    if (existingPost) {
      return res.status(409).send({
        success: false,
        message: "Post title already exists",
      });
    }
    const post = await new postModel({
      title,
      description,
      postBy,
      institute,
      field,
    }).save(); // Await the save operation

    res.status(201).send({
      success: true,
      message: "Post uploaded successfully",
      post,
    });
  } catch (error) {
    console.error("Error in postController:", error);
    res.status(500).send({
      success: false,
      message: "Error in postController",
      error,
    });
  }
};

export const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).send({
      success: true,
      message: "Successfully Got All Posts",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching posts",
      error,
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if postId is provided
    if (!postId) {
      return res.status(400).send({
        success: false,
        message: "Post ID is required",
      });
    }

    // Find the post by ID
    const post = await postModel.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }

    // Send the post as a response
    res.status(200).send({
      success: true,
      message: "Post found",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching post",
      error,
    });
  }
};

// Controller function to add a comment
export const addComment = async (req, res) => {
  try {
    const { postId, user, text } = req.body;
    const newComment = new Comment({
      postId,
      user,
      text,
    });
    const savedComment = await newComment.save();
    res
      .status(201)
      .send({
        success: true,
        message: "Comment Added Successfully",
        savedComment,
      });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

export const fetchComments = async (req, res) => {
  const postId = req.params.id; // Use 'id' instead of 'postId'

  try {
    const comments = await Comment.find({ postId });
    if (comments.length === 0) { // Check the length of the comments array
      return res.status(200).json({
        success: true,
        message: "No Comments"
      });
    }
    res.status(200).json({
      success: true,
      message: "Comments fetch Successfully",
      comments,
    });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, message: "Error fetching comments" });
  }
};
