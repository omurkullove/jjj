import React, { useEffect, useState } from "react";
import "../Account/register.css";
import { useAuth } from "./AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
//mui
import FacebookIcon from "@mui/icons-material/Facebook";

import Swal from "sweetalert2";

const RegisterPage = () => {
  const { handleRegister, error } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();

  function createUser() {
    if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Оопс...",
        text: "Некоторые поля пустые!",
      });
      return;
    }
    if (password.trim() !== passwordConfirm.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Оопс...",
        text: "Пароли не совпадают!",
      });
      return;
    }

    let user = {
      username,
      email,
      password,
      passwordConfirm,
      admin: false,
    };
    handleRegister(user, navigate);
  }

  return (
    <div className="main_register_block">
      <div className="register_block">
        <div className="title_register_block">
          <h2 className="title_register">Зарегистрироваться</h2>
        </div>
        <div className="inputs_register_main_block">
          <div className="inputs_register_block1">
            <input
              className="inputs_register"
              type="email"
              placeholder="Введите почту"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="inputs_register"
              type="password"
              placeholder=" Введите пароль"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="inputs_register_block2">
            <input
              className="inputs_register"
              type="password"
              placeholder=" Подтвердите пароль"
              onChange={e => setPasswordConfirm(e.target.value)}
            />
            <input
              className="inputs_register"
              type="text"
              placeholder="Введите никнейм"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="button_register_block">
          <button className="register_button" onClick={createUser}>
            Зарегистрироваться
          </button>
          <h5 className="register_link">
            уже есть аккаунт? <Link to="/login">Войти</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
