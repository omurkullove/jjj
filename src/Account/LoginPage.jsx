import React, { useState } from "react";
import "../Account/login.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContextProvider";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loading, getUserFromDb } = useAuth();

  function loginUser() {
    if (!password.trim() || !username.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Оопс...",
        text: "Некоторые поля пустые!",
      });
      return;
    }

    let user = {
      username,
      password,
    };
    getUserFromDb(user, navigate);
  }

  if (loading) {
    console.log("LOADING....");
  }

  return (
    <div className="main_login_block">
      <div className="login_block">
        <div className="title_login_block">
          <h2 className="title_login">Войти в аккаунт</h2>
        </div>
        <div className="inputs_login_main_block">
          <input
            className="inputs_login"
            type="text"
            placeholder="Введите никнейм"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="inputs_login"
            type="password"
            placeholder=" Введите пароль"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="button_login_block">
          <button className="login_button" onClick={() => loginUser()}>
            Войти в аккаунт
          </button>
          <h5 className="login_link">
            нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
