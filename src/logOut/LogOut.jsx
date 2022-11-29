import React, { useEffect } from "react";
import { useAuth } from "../Account/AuthContextProvider";

const LogOut = () => {
  const { currentUser, logoutUser, setCurrentUser, checkAuth, getTracks } =
    useAuth();

  useEffect(() => {
    setCurrentUser(localStorage.getItem("username"));
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("tokens")) {
  //     checkAuth();
  //   }
  // }, []);

  useEffect(() => {
    getTracks();
  }, []);

  return (
    <div>
      <h1>{currentUser ? `${currentUser}` : "NO USER"}</h1>
      <button
        style={{ width: "100px", height: "100px" }}
        onClick={() => logoutUser()}>
        LOG OUT
      </button>
    </div>
  );
};

export default LogOut;
