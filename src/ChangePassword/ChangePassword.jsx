import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Account/AuthContextProvider";

import "../ChangePassword/ChangePass.css";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const { resetPassword } = useAuth();

  const navigate = useNavigate();

  function handleChange() {
    let formData = new FormData();

    formData.append("old_password", oldPassword);
    formData.append("new_password", newPassword);
    formData.append("new_pass_confirm", newPasswordConfirm);
    resetPassword(formData, navigate);
  }

  return (
    <div className="body_block">
      <div className="main_block">
        <div className="inputs_block">
          <h1 style={{ color: "black" }}>Change your password</h1>
          <input
            placeholder="Current password"
            type="password"
            onChange={e => setOldPassword(e.target.value)}
            className="input"
          />
          <br />
          <input
            placeholder="New password"
            type="password"
            onChange={e => setNewPassword(e.target.value)}
            className="input"
          />
          <br />

          <input
            placeholder="New password confirm"
            type="password"
            onChange={e => setNewPasswordConfirm(e.target.value)}
            className="input"
          />
        </div>
        <div className="buttons_main_block">
          <div className="button_block_1">
            <button className="button1" onClick={() => navigate("/")}>
              Cansel
            </button>
          </div>
          <div className="button_block_2">
            <button onClick={handleChange} className="button2">
              Set new passsword
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
