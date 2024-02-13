import React, { useState } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [auth] = useAuth(); 
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      if (!auth.user) {
        toast.error("User not authenticated");
        return;
      }
      const postData = {
        title,
        description,
        postBy: auth.user.name, 
        institute: auth.user.institute, 
        field: auth.user.field,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/posts/post`,
        postData
      );

      if (response.data.success) {
        toast.success("POST ADDED");
        setTitle("");
        setDescription("");
        navigate("/");
      } else {
        toast.error("Error in Uploading post", response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Error in Posting", error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title mb-4">Create a New Post</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button onClick={handlePost} type="submit" className="btn btn-primary">POST</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
