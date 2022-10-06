import axios from "axios";
import { Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function handlePic(pic) {
    setLoading(true);
    if (
      pic === undefined ||
      (pic.type !== "image/jpeg" && pic.type !== "image/png")
    ) {
      setError({
        show: true,
        severity: "warning",
        message: "Please Select an Image!",
      });
      return;
    }

    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "sammyoncloud");
    fetch("https://api.cloudinary.com/v1_1/sammyoncloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const picUrl = data.url.toString();
        console.log("🚀 ~ file: Signup.jsx ~ line 40 ~ .then ~ picUrl", picUrl);

        setFormData({ ...formData, pic: picUrl });
        setLoading(false);
      })
      .catch((err) => {
        console.log("🚀 ~ file: Signup.jsx ~ line 46 ~ handlePic ~ err", err);
        setLoading(false);
      });
  }
  async function handleSignUp() {
    console.log(
      "🚀 ~ file: Signup.jsx ~ line 52 ~ handleSignUp ~ formData",
      formData
    );
    setLoading(true);
    const { name, email, password, confirmPassword, pic } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError({
        show: true,
        severity: "error",
        message: "Details not filled properly",
      });
      return;
    }

    if (password !== confirmPassword) {
      setError({
        show: true,
        severity: "error",
        message: "Passwords do not match",
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
        "/api/user/register",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log("Registration Successful");
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
    setError(); // this sets error to undefined or null?
  }
  return (
    <div>
      {error && (
        <Alert onClose={handleError} severity={error.severity}>
          {error.message}
        </Alert>
      )}
      <h1>Signup</h1>
      <input
        type="text"
        name="name"
        placeholder="Enter Your Name"
        onChange={(e) => handleFormData(e)}
      />
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
      <input
        type="password"
        name="confirmPassword"
        placeholder="Enter Your Password Again"
        onChange={(e) => handleFormData(e)}
      />
      <input
        type="file"
        accept="image/*"
        name="pic"
        onChange={(e) => handlePic(e.target.files[0])}
      />
      {loading && <h2>Please wait while image is being uploaded.</h2>}
      <button disabled={loading} onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
