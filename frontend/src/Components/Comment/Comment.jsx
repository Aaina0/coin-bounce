import React from "react";

function Comment({ comment }) {
  const date = new Date(comment.createdAt).toDateString();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "20px",
        margin: "10px",
        borderBottom: "2px solid #5b5b5b",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#c4c5c5",
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          {comment.authorUsername}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#c4c5c5",
            fontWeight: "bold",
            margin: "2px 0",
          }}
        >
          {date}
        </div>
      </div>
      <div style={{ fontSize: "18px", padding: "5px 0" }}>
        {comment.content}
      </div>
    </div>
  );
}

export default Comment;
