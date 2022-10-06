import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login, Signup } from "../components";

const Homepage = () => {
  const navigate = useNavigate();
  const [gotoLogin, setGotoLogin] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) navigate("/chats");
  }, [navigate]);

  return (
    <div>
      <h1>HOMEPAGE</h1>
      <button
        onClick={() => {
          setGotoLogin(!gotoLogin);
        }}
      >
        Switch
      </button>
      {gotoLogin ? <Login /> : <Signup />}
    </div>
  );
};

export default Homepage;
