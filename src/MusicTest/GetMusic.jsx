import { height } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";

const GetMusic = () => {
  const [music, setMusic] = useState([]);
  const API2 = "http://3.71.34.7/";

  async function getMusic() {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      let res = await axios.get(`${API2}music/tracks/`, config);
      setMusic(res.data);
      console.log(music);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {music.map(item => (
        <div key={item.slug}>
          <h3>{item.title}</h3>
          <img src={item.image} style={{ width: "200px", height: "300px" }} />
          <audio controls>
            <source src={item.file} />
          </audio>
        </div>
      ))}
      <button onClick={getMusic}>GET MUSIC</button>
      <audio controls>
        <source src="http://10.117.10.72:8000/media/track/user_aidin/Cyberpunk__Edgerunners_-_Let_You_Down_MxOapFs.mp3"></source>
      </audio>
    </div>
  );
};

export default GetMusic;
