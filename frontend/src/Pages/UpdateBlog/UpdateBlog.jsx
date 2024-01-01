import { useState, useEffect } from "react";
import { getBlogById, updateBlog } from "../../api/internal";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../Components/TextInput/TextInput";
import { useSelector } from "react-redux";

function UpdateBlog() {
  const navigate = useNavigate();

  const params = useParams();
  const blogId = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const author = useSelector((state) => state.user._id);

  const updateHandler = async () => {
    let data;
    if (photo.includes("http")) {
      data = {
        author,
        title,
        content,
        blogId,
      };
    } else {
      data = {
        author,
        title,
        content,
        photo,
        blogId,
      };
    }

    const response = await updateBlog(data);

    if (response.status === 200) {
      navigate("/");
    }
  };

  useEffect(() => {
    async function getBlogDetails() {
      const response = await getBlogById(blogId);
      if (response.status === 200) {
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
        setPhoto(response.data.blog.photo);
      }
    }
    getBlogDetails();
  }, []);

  return (
    <div
      style={{
        margin: "0 auto",
        width: "80vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          width: "inherit",
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        Edit your blog
      </div>
      <TextInput
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "60%" }}
      />
      <textarea
        style={{
          padding: "18px 30px",
          margin: "15px",
          width: "60%",
          outline: "none",
          borderRadius: "10px",
          border: "1px solid #fff",
          fontSize: "20px",
          minHeight: "200px",
        }}
        placeholder="your content goes here..."
        maxLength={400}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          fontSize: "20px",
          justifyContent: "center",
          gap: "50px",
          width: "60%",
          alignItems: "center",
        }}
      >
        <p>Choose a photo</p>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/jpg, image/jpeg, image/png"
          onChange={getPhoto}
        />
        {photo !== "" ? <img src={photo} width={150} height={150} /> : ""}
      </div>
      <button
        style={{
          backgroundColor: "#3861fb",
          color: "#fff",
          border: "none",
          outline: "none",
          width: "30%",
          borderRadius: "10px",
          padding: "15px 30px",
          fontWeight: "bold",
          cursor: "pointer",
          margin: "40px",
        }}
        onClick={updateHandler}
      >
        Update
      </button>
    </div>
  );
}

export default UpdateBlog;
