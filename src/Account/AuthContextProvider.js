import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const authContextProvider = React.createContext();
export const useAuth = () => useContext(authContextProvider);

const AuthContextProvider = ({ children }) => {
  const API = "http://3.71.34.7/";

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  //?Функция регистрации , а точнее отправки данных пользователя для регистрации
  async function handleRegister(formData, naviagte) {
    try {
      const res = await axios.post(`${API}account/register/`, formData);
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Поздравляю!",
        text: `${res.data}`,
      });
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

  //?Функция логина, отправка данных , получения токенов
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

  //?Функция сброса пароля с помощью старого пароля и токенов
  async function resetPassword(formData, navigate) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      let res = axios.post(`${API}account/change-password/`, formData, config);
      Swal.fire({
        icon: "success",
        title: "Оппааа...",
        text: `${res.data}`,
      });
      navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: `${Object.values(err.response.data).flat(2)}`,
      });
    }
  }

  //?Функция получения треков - пока не даработанная
  async function getTracks() {
    try {
      let res = await axios.get(`${API}music/tracks/`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  //?Функция  запрос на сброс пароля с помощью почты
  async function restorePass(formData, navigate) {
    try {
      await axios.post(`${API}account/restore-password/`, formData);
      Swal.fire({
        icon: "success",
        title: "фокус-покус",
        text: `Проверьте почту , вам выслали код подтверждения!"`,
      });
      navigate("/setRestore-pass");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "оу щииит....перепроверьте почту",
        text: `${Object.values(err.response.data).flat(2)}`,
      });
    }
  }

  //?Функция - выход с аккаунта
  function logoutUser() {
    localStorage.removeItem("tokens");
    localStorage.removeItem("username");
    setCurrentUser(false);
  }

  //?Фунция - удаление аккаунта
  async function deleteAccount() {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const Authorization = `Bearer ${tokens.access}`;
    const config = {
      headers: {
        Authorization,
      },
    };
    try {
      let res = await axios.delete(`${API}account/delete-account/`, config);

      console.log(res);
      logoutUser();
    } catch (err) {
      console.log(err);
    }
  }

  //?Функия сброса пароля после запроса
  async function setRestore(formData, navigate) {
    try {
      let res = await axios.post(
        `${API}account/set-restored-password/`,
        formData
      );
      Swal.fire({
        icon: "success",
        title: "оууу щиииит..",
        text: `${res.data}`,
      });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "warning",
        title: "Таксс...",
        text: `${Object.values(err.response.data).flat(2)}`,
      });
    }
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
        restorePass,
        setRestore,
        deleteAccount,
        resetPassword,
      }}>
      {children}
    </authContextProvider.Provider>
  );
};
export default AuthContextProvider;
