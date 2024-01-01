import { useState } from "react";
import TextInput from "../../Components/TextInput/TextInput";
import signupSchema from "../../schemas/signupSchema";
import { useFormik } from "formik";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../api/internal";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const data = {
      name: values.name,
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: values.email,
    };

    const response = await signup(data);

    if (response.status === 201) {
      // setUser
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      };

      dispatch(setUser(user));

      // redirect homepage
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      // display error message
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: signupSchema,
  });

  return (
    <div
      style={{
        margin: "20px auto",
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
          marginBottom: "20px",
        }}
      >
        Create an account
      </div>
      <TextInput
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="name"
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />

      <TextInput
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="username"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />

      <TextInput
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="email"
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />

      <TextInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />

      <TextInput
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="confirm password"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />

      <button
        style={{
          backgroundColor: "#3861fb",
          color: "white",
          border: "none",
          outline: "none",
          width: "30%",
          borderRadius: "10px",
          padding: "15px 30px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "20px",
          margin: "10px",
          marginTop: "30px",
        }}
        onClick={handleSignup}
        disabled={
          !values.username ||
          !values.password ||
          !values.name ||
          !values.confirmPassword ||
          !values.email ||
          errors.username ||
          errors.password ||
          errors.confirmPassword ||
          errors.name ||
          errors.email
        }
      >
        Sign Up
      </button>

      <span>
        Already have an account?{" "}
        <button
          style={{
            marginTop: "50px",
            marginLeft: "10px",
            color: "#16c784",
            fontSize: "18px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
      </span>

      {error !== "" && (
        <p
          style={{
            color: "#ea3943",
            margin: "20px 0",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Signup;
