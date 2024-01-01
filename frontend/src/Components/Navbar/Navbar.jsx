import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { signout } from "../../api/internal";
import { resetUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.auth);

  const handleSignout = async () => {
    await signout();
    dispatch(resetUser());
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "20px 0",
          margin: "20px auto",
          width: "80%",
        }}
      >
        <NavLink
          to="/"
          style={{
            fontSize: "32px",
            fontWeight: 800,
            textDecoration: "none",
            color: "black",
          }}
        >
          CoinBounce
        </NavLink>

        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "22px",
            fontWeight: "bold",
            color: "#3861fb",
          }}
          className={({ isActive }) => (isActive ? { color: "#3861fb", fontSize: "22px", fontWeight: "bold" } : { textDecoration: "none", fontSize: "22px", fontWeight: "bold" })}
        >
          Home
        </NavLink>

        <NavLink
          to="crypto"
          style={{
            textDecoration: "none",
            fontSize: "22px",
            fontWeight: "bold",
            color: "#3861fb",
          }}
          className={({ isActive }) => (isActive ? { color: "#3861fb", fontSize: "22px", fontWeight: "bold" } : { textDecoration: "none", fontSize: "22px", fontWeight: "bold" })}
        >
          Cryptocurrencies
        </NavLink>

        <NavLink
          to="blogs"
          style={{
            textDecoration: "none",
            fontSize: "22px",
            fontWeight: "bold",
            color: "#3861fb",
          }}
          className={({ isActive }) => (isActive ? { color: "#3861fb", fontSize: "22px", fontWeight: "bold" } : { textDecoration: "none", fontSize: "22px", fontWeight: "bold" })}
        >
          Blogs
        </NavLink>

        <NavLink
          to="submit"
          style={{
            textDecoration: "none",
            fontSize: "22px",
            fontWeight: "bold",
            color: "#3861fb",
          }}
          className={({ isActive }) => (isActive ? { color: "#3861fb", fontSize: "22px", fontWeight: "bold" } : { textDecoration: "none", fontSize: "22px", fontWeight: "bold" })}
        >
          Submit a blog
        </NavLink>

        {isAuthenticated ? (
          <div>
            <NavLink>
              <button
                style={{
                  border: "none",
                  outline: "none",
                  borderRadius: "10px",
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "large",
                  textDecoration: "none",
                }}
                onClick={handleSignout}
              >
                Sign Out
              </button>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink
              to="login"
              style={{
                textDecoration: "none",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#3861fb",
              }}
              className={({ isActive }) => (isActive ? { color: "#3861fb", fontSize: "22px", fontWeight: "bold" } : { textDecoration: "none", fontSize: "22px", fontWeight: "bold" })}
            >
              <button
                style={{
                  border: "none",
                  outline: "none",
                  borderRadius: "10px",
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "large",
                  textDecoration: "none",
                }}
              >
                Log In
              </button>
            </NavLink>

            <NavLink
              to="signup"
              style={{
                textDecoration: "none",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#3861fb",
              }}
              className={({ isActive }) => (isActive ? { color: "#3861fb", fontSize: "22px", fontWeight: "bold" } : { textDecoration: "none", fontSize: "22px", fontWeight: "bold" })}
            >
              <button
                style={{
                  marginLeft: "10px",
                  backgroundColor: "#3861fb",
                  color: "white",
                  border: "none",
                  outline: "none",
                  borderRadius: "10px",
                  padding: "10px 15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "large",
                }}
              >
                Sign Up
              </button>
            </NavLink>
          </div>
        )}
      </nav>
      <div
        style={{
          height: "1px",
          marginTop: "5px",
          background: "linear-gradient(to right, transparent, #9ba3c2, transparent)",
        }}
      ></div>
    </>
  );
}

export default Navbar;
