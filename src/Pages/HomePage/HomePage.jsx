import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import Navbar from "../../Account/Componets/Navbar";

import "../HomePage/HomePage.css";
import { useProduct } from "./ProductContextProvider";
//https://muzzona.kz/kzander/50905-mirbek-atabekov-muras-nurel-remix.html

import { useAuth } from "../../Account/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { useSave } from "../SavedPage/SavedContextProvider";
import { Pagination } from "@mui/material";
import Card from "./Card";

const HomePage = () => {
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
  }, [setPage]);

  return (
    <>
      <Navbar />
      <Card />
    </>
  );
};

export default HomePage;
