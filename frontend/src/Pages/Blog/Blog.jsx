import React, { useState, useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
import { getAllBlogs } from "../../api/internal";
import { useNavigate } from "react-router-dom";

function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogsApiCall = async () => {
      const response = await getAllBlogs();

      if (response.status === 200) {
        setBlogs(response.data.blogs);
      }
    };

    getAllBlogsApiCall();
  }, []);

  if (blogs.length === 0) {
    return <Loader text="blogs" />;
  }

  return (
    <div
      style={{
        margin: "50px 0",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {blogs.map((blog) => (
        <div
          key={blog._id}
          style={{
            backgroundColor: "black",
            border: "1px solid #fff",
            borderRadius: "10px",
            width: "80%",
            padding: "16px",
            margin: "40px 20px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => navigate(`/blog/${blog._id}`)}
        >
          <h1
            style={{
              textAlign: "left",
              margin: "15px 0",
              backgroundColor: "transparent",
              color: "#fff",
            }}
          >
            {blog.title}
          </h1>
          <img
            src={blog.photo}
            alt="Blog Cover"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "10px",
            }}
          />
          <p style={{ marginTop: "20px", fontWeight: "bold" }}>
            {blog.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Blog;
