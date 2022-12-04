import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../AuthContextProvider";
import "../RestorePassword/RestorePassword.css";
const SetRestorePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [restoreCode, setRestoreCode] = useState("");
  const [email, setEmail] = useState("");
  const { setRestore } = useAuth();

  const navigate = useNavigate();

  function setRestorePassword() {
    if (!password.trim() || !passwordConfirm.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Оопс...",
        text: "Некоторые поля пустые!",
      });
      return;
    }
    let formData = new FormData();
    formData.append("new_password", password);
    formData.append("new_pass_confirm", passwordConfirm);
    formData.append("code", restoreCode);
    formData.append("email", email);
    console.log(formData);
    setRestore(formData, navigate);
    // naviagte("/login");
  }

  return (
    <div className="restore_main_block">
      <div className="restore_navabar_block">
        <img
          className="restore_navbar_icon"
          src="data:image/png;base64,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"
        />
      </div>
      <div className="restore_title_block">
        <h3 style={{ fontSize: "50px" }}>Сброс пароля</h3>
      </div>
      <div className="restore_block_input">
        <div className="restore_block_input">
          <h3 className="restore_input_titile">Придумайте новый пароль</h3>

          <TextField
            className="restore_inputs"
            // id="outlined-error-helper-text"
            placeholder="Придумайте новый пароль"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="restore_block_input">
          <h3 className="restore_input_titile">Подтвердите пароль</h3>

          <TextField
            className="restore_inputs"
            // id="outlined-error-helper-text"
            placeholder="Подтвердите пароль"
            // helperText={error ? `${error}` : null}
            type="password"
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className="restore_block_input">
          <h3 className="restore_input_titile">Введите код</h3>

          <TextField
            className="restore_inputs"
            // id="outlined-error-helper-text"
            placeholder="Введите код"
            // helperText={error ? `${error}` : null}
            type="password"
            onChange={e => setRestoreCode(e.target.value)}
          />
        </div>
        <div className="restore_block_input">
          <h3 className="restore_input_titile">Введите свою почту</h3>

          <TextField
            className="restore_inputs"
            // id="outlined-error-helper-text"
            placeholder="Введите свою почту"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="restore_button_block">
        <button className="restore_button" onClick={setRestorePassword}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default SetRestorePassword;
