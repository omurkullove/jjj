import React from "react";
import Navbar from "../../Account/Componets/Navbar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSave } from "./SavedContextProvider";
import { useEffect } from "react";

const SavedPage = () => {
  const { saved, getMusic, deleteFromSaved } = useSave();

  useEffect(() => {
    getMusic();
    qqq();
  }, []);

  function qqq() {
    saved.products.map(item => {
      console.log(item.item.name);
    });
  }

  return (
    <>
      <Navbar />
      <div className="home_main_block">
        <div className="home_main_block_2">
          {saved?.products.map(item => (
            <div className="home_music_block">
              <div className="music_img_block">
                <img
                  className="music_img"
                  src={
                    item.item.img
                      ? item.item.img
                      : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-15.png"
                  }
                  alt="no img"
                />
              </div>
              <div className="music_block2">
                <h2 className="home_music_title">{item.item.name}</h2>
                <h2 className="home_music_title">{item.item.author}</h2>
                <div className="music_settings">
                  <button
                    className="music_settings_button"
                    onClick={() => deleteFromSaved(item.item.id)}>
                    <DeleteIcon className="music_icons" />
                  </button>
                </div>

                <div className="music_audio_block">
                  <audio controls className="audio">
                    <source src={item.item.file} />
                  </audio>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SavedPage;
