import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const authContextProvider = React.createContext();
export const useAuth = () => useContext(authContextProvider);

const AuthContextProvider = ({ children }) => {
  const API = "http://18.197.10.36/";

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  async function handleRegister(formData, naviagte) {
    try {
      const res = await axios.post(`${API}account/register/`, formData);
      console.log(res);
      naviagte("/login");
    } catch (err) {
      // setError();
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: `${Object.values(err.response.data).flat(2)}`,
      });
    }
  }

  async function handleLogin(formData, username, navigate) {
    setLoading(true);
    try {
      const res = await axios.post(`${API}account/login/`, formData);
      // console.log(res);
      localStorage.setItem("tokens", JSON.stringify(res.data));
      localStorage.setItem("username", username);
      setCurrentUser(username);
      console.log(currentUser);
      navigate("/logout");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: `${Object.values(err.response.data).flat(2)}`,
      });
    } finally {
      setLoading(false);
    }
  }

  // async function checkAuth() {
  //   try {
  //     console.log("CHECK AUTH IS WORKING!");
  //     const tokens = JSON.parse(localStorage.getItem("tokens"));
  //     const Autharization = `Bearer ${tokens.access}`;
  //     const config = {
  //       headers: {
  //         Autharization,
  //       },
  //     };
  //     const res = await axios.post(
  //       `${API}account/api/token/refresh/`,
  //       {
  //         refresh: tokens.refresh,
  //       },
  //       config
  //     );
  //     localStorage.setItem(
  //       "tokens",
  //       JSON.stringify("tokens", {
  //         access: res.data.access,
  //         refresh: tokens.refresh,
  //       })
  //     );
  //     const username = localStorage.getItem("username");
  //     setCurrentUser(username);
  //   } catch (err) {
  //     console.log(err);
  //     // logoutUser();
  //   }
  // }

  async function getTracks() {
    try {
      // const tokens = JSON.parse(localStorage.getItem("tokens"));
      // const Autharization = `Bearer ${tokens.access}`;
      // const config = {
      //   headers: {
      //     Autharization,
      //   },
      // };
      let res = await axios.get(`${API}music/tracks/`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  function logoutUser() {
    localStorage.removeItem("tokens");
    localStorage.removeItem("username");
    setCurrentUser(false);
  }

  return (
    <authContextProvider.Provider
      value={{
        error,
        currentUser,
        loading,
        error,

        handleRegister,
        handleLogin,
        logoutUser,
        setCurrentUser,
        getTracks,
        // checkAuth,
      }}>
      {children}
    </authContextProvider.Provider>
  );
};
export default AuthContextProvider;
