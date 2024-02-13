import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/posts/getallposts`
      );
      const { data } = response;
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          {posts.map((post) => (
            <div key={post._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header">
                  {post.postBy} ({post.field}-{post.institute})
                </div>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <Link
                     to={auth.user ? `/post/${post._id}` : "/login"}
                    className="btn btn-primary"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
