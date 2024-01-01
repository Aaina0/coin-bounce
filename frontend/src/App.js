import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home.jsx";
import Protected from "./Components/Protected/Protected.jsx";
import Error from "./Pages/Error/Error.jsx";
import Login from "./Pages/Login/Login.jsx";
import { useSelector } from "react-redux";
import Signup from "./Pages/SignUp/SignUp.jsx";
import Crypto from "./Pages/Crypto/Crypto.jsx";
import Blog from "./Pages/Blog/Blog.jsx";
import SubmitBlog from "./Pages/SubmitBlog/SubmitBlog.jsx";
import BlogDetails from "./Pages/BlogDetails/BlogDetails.jsx";
import UpdateBlog from "./Pages/UpdateBlog/UpdateBlog.jsx";
import useAutoLogin from "./hooks/useAutoLogin.js";
import Loader from "./Components/Loader/Loader.jsx";

function App() {
  const isAuth = useSelector((state) => state.user.auth);

  const loading = useAutoLogin();

  return loading ? (
    <Loader text="..." />
  ) : (
    <div
      style={{
        margin: "20px",
      }}
    >
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "95vh",
          }}
        >
          <Navbar />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <div
                  style={{
                    flex: "1",
                  }}
                >
                  <Home />
                </div>
              }
            />

            <Route
              path="crypto"
              exact
              element={
                <div
                  style={{
                    flex: "1",
                  }}
                >
                  <Crypto />
                </div>
              }
            />

            <Route
              path="blogs"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div
                    style={{
                      flex: "1",
                    }}
                  >
                    <Blog />
                  </div>
                </Protected>
              }
            />

            <Route
              path="blog/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div
                    style={{
                      flex: "1",
                    }}
                  >
                    <BlogDetails />
                  </div>
                </Protected>
              }
            />

            <Route
              path="blog-update/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div
                    style={{
                      flex: "1",
                    }}
                  >
                    <UpdateBlog />
                  </div>
                </Protected>
              }
            />

            <Route
              path="submit"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div
                    style={{
                      flex: "1",
                    }}
                  >
                    <SubmitBlog />
                  </div>
                </Protected>
              }
            />

            <Route
              path="signup"
              exact
              element={
                <div
                  style={{
                    flex: "1",
                  }}
                >
                  <Signup />
                </div>
              }
            />

            <Route
              path="login"
              exact
              element={
                <div
                  style={{
                    flex: "1",
                  }}
                >
                  <Login />
                </div>
              }
            />

            <Route
              path="*"
              element={
                <div
                  style={{
                    flex: "1",
                  }}
                >
                  <Error />
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
