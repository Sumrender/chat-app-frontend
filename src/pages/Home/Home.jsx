import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { userDetails } from "../../media/test_data";

const Home = () => {
  let { currentUser, setCurrentUser } = useContext(UserContext);

  const createTempUser = () => {
    localStorage.setItem("user", JSON.stringify(userDetails));
    setCurrentUser(userDetails);
    // if reload works then good otherwise, import setCurrentUser here
  };

  function delUser() {
    setCurrentUser(null);
    localStorage.removeItem("user");
  }

  return (
    <div>
      <h1>HOME</h1>
      <button onClick={createTempUser}>create user</button>
      <button onClick={delUser}>del user</button>
      {currentUser ? <h1>{currentUser.username} exists</h1> : <h2>no user</h2>}
      <a href="/courses">go to courses</a>
    </div>
  );
};

export default Home;
