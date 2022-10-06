import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSignIn() {
    setLoading(true);
    const { email, password } = formData;

    if (!email || !password) {
      setError({
        show: true,
        severity: "error",
        message: "Details not filled properly",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log("Login Successful");
      // if successful show something?
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err) {
      console.log(err);
      setError({
        show: true,
        severity: "error",
        message: "Sorry! It's not you, It's us.",
      });
      setLoading(false);
    }
  }
  function handleFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleError() {
    setError();
  }

  return (
    <div>
      {error && (
        <Alert onClose={handleError} severity={error.severity}>
          {error.message}
        </Alert>
      )}
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter Your Email address"
        onChange={(e) => handleFormData(e)}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter Your Password"
        onChange={(e) => handleFormData(e)}
      />
      {loading && <p>Waiting for chocolating...</p>}
      <button disabled={loading} onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
};

export default Login;
