import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const productContextProvider = React.createContext();
export const useProduct = () => useContext(productContextProvider);

const PoductContextProvider = ({ children }) => {
  let API = " http://localhost:8000/products";

  const [allMusic, setAllMusic] = useState([]);

  const [musicDetails, setMusicdetails] = useState(null);

  const location = useLocation();

  const navigate = useNavigate();

  async function getMusic() {
    try {
      let res = await axios(`${API}/${window.location.search}`);
      setAllMusic(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteMusic(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getMusic();
    } catch (err) {
      console.log(err);
    }
  }

  async function editProduct(id, navigate, editedProduct) {
    try {
      await axios.patch(`${API}/${id}`, editedProduct);
      navigate("/home");
      getMusic();
    } catch (err) {
      console.log(err);
    }
  }

  async function addProduct(newProduct) {
    try {
      await axios.post(API, newProduct);
      getMusic();
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  async function getMusicDetails(id) {
    try {
      let res = await axios(`${API}/${id}`);
      setMusicdetails(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  const fetchByParams = (query, value) => {
    const search = new URLSearchParams(location.search);

    if (value === "all") {
      search.delete(query);
    } else {
      search.set(query, value);
    }

    const url = `${location.pathname}?${search.toString()}`;

    navigate(url);
  };

  return (
    <productContextProvider.Provider
      value={{
        allMusic,
        musicDetails,

        getMusic,
        deleteMusic,
        editProduct,
        getMusicDetails,
        fetchByParams,
        addProduct,
      }}>
      {children}
    </productContextProvider.Provider>
  );
};

export default PoductContextProvider;
