import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // alert("context useEffect called");
    let userDetails = JSON.parse(localStorage.getItem("user"));
    console.log(userDetails);
    if (userDetails) setCurrentUser(userDetails);
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
