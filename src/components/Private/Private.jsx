import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Private = ({ user }) => {
  const { currentUser } = user;
  console.log(currentUser);

  return <h1>currjgfhgshsent</h1>;
};

export default Private;
