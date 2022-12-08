import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Account/AuthContextProvider";
import { useSave } from "../SavedPage/SavedContextProvider";
import { useProduct } from "./ProductContextProvider";

import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Pagination } from "@mui/material";

import "../HomePage/HomePage.css";

const Card = () => {
  const { allMusic, getMusic, deleteMusic } = useProduct();
  const { currentUser, setCurrentUser } = useAuth();
  const { addMusicToSaved } = useSave();

  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  React.useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    getMusic();
  }, []);
  const itemOnPage = 3;

  const count = Math.ceil(allMusic.length / itemOnPage);

  const handlePage = (e, p) => {
    setPage(p);
  };

  function currentData() {
    const begin = (page - 1) * itemOnPage;
    const end = begin + itemOnPage;
    return allMusic.slice(begin, end);
  }

  return (
    <div className="home_main_block">
      <div className="home_main_block_2">
        {currentData()?.map(item => (
          <div className="home_music_block">
            <div className="music_img_block">
              <img
                className="music_img"
                src={
                  item.img
                    ? item.img
                    : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png"
                }
                alt="no img"
              />
            </div>
            <div className="music_block2">
              <div className="home_title_block">
                <h2 className="home_music_title">{item.name}</h2>
                <h2 className="home_music_title">{item.author}</h2>
                <h2 className="home_music_title">Жанр:{item.genre}</h2>
              </div>
              {currentUser && currentUser.admin ? (
                <div className="music_settings">
                  <button
                    className="music_settings_button"
                    onClick={() => deleteMusic(item.id)}>
                    <DeleteIcon className="music_icons" />
                  </button>
                  <button
                    className="music_settings_button"
                    onClick={() => navigate(`/edit/${item.id}`)}>
                    <SettingsIcon className="music_icons" />
                  </button>
                  <button
                    className="music_settings_button"
                    onClick={() => addMusicToSaved(item)}>
                    <BookmarkAddIcon className="music_icons" />
                  </button>
                </div>
              ) : (
                <>
                  <p
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      margin: "15px",
                    }}>
                    Настройки доступны только для админов
                  </p>
                  <button
                    className="music_settings_button"
                    onClick={() => addMusicToSaved(item)}>
                    <BookmarkAddIcon className="music_icons" />
                  </button>
                </>
              )}
              <div className="music_audio_block">
                <audio controls className="audio">
                  <source src={item.file} />
                </audio>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="paginaation_block">
        <div className="pagination">
          <Pagination
            className="pagination"
            count={count}
            page={page}
            onChange={handlePage}
            variant="outlined"
            color="secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
