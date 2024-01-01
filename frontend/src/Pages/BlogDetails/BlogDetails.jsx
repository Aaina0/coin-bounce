import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getBlogById,
  deleteBlog,
  postComment,
  getCommentsById,
} from "../../api/internal";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import CommentList from "../../Components/Comment List/CommentList";

function BlogDetails() {
  const [blog, setBlog] = useState([]);
  const [comments, setComments] = useState([]);
  const [ownsBlog, setOwnsBlog] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const blogId = params.id;

  const username = useSelector((state) => state.user.username);
  const userId = useSelector((state) => state.user._id);

  useEffect(() => {
    const getBlogDetails = async () => {
      const commentResponse = await getCommentsById(blogId);
      if (commentResponse.status === 200) {
        setComments(commentResponse.data.data);
      }

      const blogResponse = await getBlogById(blogId);
      if (blogResponse.status === 200) {
        // set ownership
        setOwnsBlog(username === blogResponse.data.blog.authorUsername);
        setBlog(blogResponse.data.blog);
      }
    };
    getBlogDetails();
  }, [reload]);

  const postCommentHandler = async () => {
    const data = {
      author: userId,
      blog: blogId,
      content: newComment,
    };

    const response = await postComment(data);

    if (response.status === 201) {
      setNewComment("");
      setReload(!reload);
    }
  };

  const deleteBlogHandler = async () => {
    const response = await deleteBlog(blogId);

    if (response.status === 200) {
      navigate("/");
    }
  };

  if (blog.length === 0) {
    return <Loader text="blog details" />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "50px",
        margin: "10px 50px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "25px 0",
        }}
      >
        <h1 style={{ textAlign: "center" }}>{blog.title}</h1>
        <div
          style={{
            display: "flex",
            gap: "25px",
            justifyContent: "flex-start",
            marginBottom: "20px",
          }}
        >
          <p>
            @{blog.authorUsername +
              " on " +
              new Date(blog.createdAt).toDateString()}
          </p>
        </div>
        <div
          style={{
            margin: "10px auto",
          }}
        >
          <img
            src={blog.photo}
            width={250}
            height={250}
            alt="Blog Cover"
            style={{
              borderRadius: "10px",
            }}
          />
        </div>
        <p
          style={{
            textAlign: "left",
            margin: "20px 0",
          }}
        >
          {blog.content}
        </p>
        {ownsBlog && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                marginLeft: "10px",
                backgroundColor: "#16c784",
                color: "#fff",
                border: "none",
                outline: "none",
                borderRadius: "10px",
                padding: "10px 15px",
                cursor: "pointer",
                fontWeight: "bold",
                height: "fit-content",
              }}
              onClick={() => {
                navigate(`/blog-update/${blog._id}`);
              }}
            >
              Edit
            </button>
            <button
              style={{
                marginLeft: "10px",
                backgroundColor: "#ea3943",
                color: "#fff",
                border: "none",
                outline: "none",
                borderRadius: "10px",
                padding: "10px 15px",
                cursor: "pointer",
                fontWeight: "bold",
                height: "fit-content",
              }}
              onClick={deleteBlogHandler}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <CommentList comments={comments} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            style={{
                border: "none",
                padding: "10px 20px",
                color: "#bebcc0",
                fontSize: "18px",
                borderRadius: "10px",
                outline: "none",
                margin: "15px 10px",
                border: "1px solid #fff",
                flex: "1",
              }}
              placeholder="comment goes here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              style={{
                backgroundColor: "#3861fb",
                color: "#fff",
                border: "none",
                outline: "none",
                cursor: "pointer",
                fontSize: "15px",
                padding: "10px 40px",
                height: "fit-content",
                borderRadius: "10px",
              }}
              onClick={postCommentHandler}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default BlogDetails;
  
