import { Link } from "react-router-dom";

function Error() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <div
        style={{
          color: "#ea3943",
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        Error 404 - Page not found
      </div>
      <div style={{ fontSize: "30px", margin: "20px 0" }}>
        Go back to
        <Link
          to="/"
          style={{
            marginLeft: "20px",
            textDecoration: "none",
            fontWeight: "bold",
            color: "#3861fb",
          }}
        >
          home
        </Link>
      </div>
    </div>
  );
}

export default Error;
