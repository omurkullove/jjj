import React from "react";
import { useNavigate } from "react-router-dom";
import "../PreviewPage/PreviewPage.css";

const PreviewPage = () => {
  const navigate = useNavigate();

  return (
    <div className="preview_body_block">
      <div className="preview_main_block">
        <div className="preview_img_blcok">
          <div className="preview_img_parent_block">
            <div className="preview_iphone_part"></div>
            <img
              src="https://i.scdn.co/image/ab678e040000ed3aed58911aecc6dbc16949f40b"
              className="preview_img"
            />
          </div>
        </div>
        <div className="preview_text_block">
          <img
            src="https://www.smarthomeassistent.de/wp-content/uploads/2019/11/Spotify_Logo800x500.png"
            className="preview_spotify_icon"
          />
          <h2 className="preview_text">
            Play millions of songs and podcasts, for free.
          </h2>
          <div className="preview_button_group">
            <button
              class="preview_button"
              role="button"
              onClick={() => navigate("/register")}>
              SIGN UP
            </button>
            <button
              className="preview_button"
              onClick={() => navigate("/login")}>
              LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
