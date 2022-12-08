import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const authContextProvider = React.createContext();
export const useAuth = () => useContext(authContextProvider);

const AuthContextProvider = ({ children }) => {
  const API = "http://localhost:8000/users";

  const [currentUser, setCurrentUser] = useState(false);

  //?Функция регистрации , а точнее отправки данных пользователя для регистрации
  async function handleRegister(user, naviagte) {
    try {
      const { data } = await axios(API);
      let finduser = data.find(item => item.username == user.username);
      if (finduser) {
        // naviagte("/register");
        Swal.fire({
          icon: "warning",
          title: "Опппсс...",
          text: `Аккаунт с таким именем занят!`,
        });
        return;
      }
      await axios.post(API, user);
      Swal.fire({
        icon: "success",
        title: "Поздравляю!",
        text: `Вы успешно зарегистрировались!`,
      });
      naviagte("/login");
    } catch (err) {
      // setError();
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: `Ошибка!`,
      });
    }
  }

  //?Функция логина, отправка данных , получения токенов

  async function getUserFromDb(user, navigate) {
    let { data } = await axios(API);

    let finduser = data.find(item => item.username == user.username);
    if (!finduser) {
      Swal.fire({
        icon: "warning",
        title: "Оппсс..",
        text: `Аккаунт с таким именем не найден!`,
      });
      return;
    }
    if (finduser.password !== user.password) {
      Swal.fire({
        icon: "error",
        title: "Ошибка!",
        text: `Неверный пароль!`,
      });
      return;
    }
    localStorage.setItem("user", JSON.stringify(finduser));
    navigate("/home");
    // getUserFromLs();
  }

  //?Функция - выход с аккаунта
  function logoutUser() {
    // localStorage.removeItem("tokens");
    localStorage.removeItem("user");
    setCurrentUser(false);
  }

  //?Фунция - удаление аккаунта
  async function deleteAccount(id) {
    try {
      await axios.delete(`${API}/${id}`);
      logoutUser();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <authContextProvider.Provider
      value={{
        currentUser,

        handleRegister,
        getUserFromDb,
        logoutUser,
        setCurrentUser,
        deleteAccount,
      }}>
      {children}
    </authContextProvider.Provider>
  );
};
export default AuthContextProvider;
