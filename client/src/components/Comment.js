import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";

const Comment = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    fetchComments();
  }, [postId]); // Fetch comments whenever postId changes

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/posts/comments/${postId}`
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      // Ensure auth object and user information are available
      if (!auth || !auth.user) {
        console.error("User not authenticated");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/posts/addcomment`,
        {
          postId,
          text: comment,
          user: auth.user.name,
        }
      );
      const newComment = response.data;
      setComments([...comments, newComment]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mt-3">
      <h5>Comments:</h5>
      {comments.map((comment) => (
        <div key={comment._id} className="mb-2">
          <strong>{comment.user}: </strong>
          {comment.text}
        </div>
      ))}

      <div className="form-group mt-3">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleAddComment}>
        Add Comment
      </button>
    </div>
  );
};

export default Comment;
