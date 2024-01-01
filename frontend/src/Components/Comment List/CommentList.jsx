import React from "react";
import Comment from "../Comment/Comment";

function CommentList({ comments }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
        }}
      >
        {comments.length === 0 ? (
          <div style={{ margin: "10px", textAlign: "center" }}>
            No comments posted
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
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
                  {new Date(comment.createdAt).toDateString()}
                </div>
              </div>
              <div style={{ fontSize: "18px", padding: "5px 0" }}>
                {comment.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentList;
