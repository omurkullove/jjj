import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../PreviewPage/PreviewPage.css";

const PreviewPage = () => {
  const navigate = useNavigate();
  return (
    <div className="body_block">
      <div className="main_block">
        <div className="title_block">
          <h1 className="title">
            Здравствуйте , чтобы продолжить, пожалуйста зарегистрируйтесь
          </h1>
        </div>
        <div className="main_block_2">
          <div className="button_block">
            <button className="buttons" onClick={() => navigate("/register")}>
              Зарегистрироваться
            </button>
            <button className="buttons" onClick={() => navigate("/login")}>
              Войти в аккаунт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
