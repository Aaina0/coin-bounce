import { useState } from "react";
import { submitBlog } from "../../api/internal";
import { useSelector } from "react-redux";
import TextInput from "../../Components/TextInput/TextInput";
import { useNavigate } from "react-router-dom";

function SubmitBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  const author = useSelector((state) => state.user._id);

  const getPhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
  };

  const submitHandler = async () => {
    const data = {
      author,
      title,
      content,
      photo,
    };

    const response = await submitBlog(data);

    if (response.status === 201) {
      navigate("/");
    }
  };

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
        Create a blog!
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
        onClick={submitHandler}
        disabled={title === "" || content === "" || photo === ""}
      >
        Submit
      </button>
    </div>
  );
}

export default SubmitBlog;
