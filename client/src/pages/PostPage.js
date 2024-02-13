import React, { useState, useEffect } from 'react';
import Layout from '../components/Layouts/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment'; // Import the Comment component

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/posts/getpost/${id}`
        );
        const { data } = response;
        setPost(data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]); 

  return (
    <Layout>
      <div className="container mt-4">
        {post ? (
          <div className="card">
            <div className="card-header">
              {post.postBy} ({post.field}-{post.institute}) - {new Date(post.createdAt).toLocaleString()}
            </div>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.description}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {/* Render the Comment component */}
        {post && <Comment postId={post._id} />}
      </div>
    </Layout>
  );
};

export default PostPage;
