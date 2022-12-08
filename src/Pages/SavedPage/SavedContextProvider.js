import React, { useContext, useReducer } from "react";

export const savedContextProvider = React.createContext();
export const useSave = () => useContext(savedContextProvider);

const INIT_STATE = {
  saved: JSON.parse(localStorage.getItem("saved")),
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_MUSIC":
      return { ...state, saved: action.payload };
  }
}

const SavedContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getMusic = () => {
    let saved = JSON.parse(localStorage.getItem("saved"));
    if (!saved) {
      localStorage.setItem("saved", JSON.stringify({ products: [] }));
      saved = {
        products: [],
      };
    }

    dispatch({
      type: "GET_MUSIC",
      payload: saved,
    });
  };

  function addMusicToSaved(product) {
    let saved = JSON.parse(localStorage.getItem("saved"));
    if (!saved) {
      saved = {
        products: [],
      };
    }

    let newProduct = {
      item: product,
    };
    let productToFind = saved.products.filter(
      elem => elem.item.id === product.id
    );
    if (productToFind.length === 0) {
      saved.products.push(newProduct);
    } else {
      saved.products = saved.products.filter(
        elem => elem.item.id !== product.id
      );
    }

    localStorage.setItem("saved", JSON.stringify(saved));
    getMusic();
  }

  const deleteFromSaved = id => {
    let saved = JSON.parse(localStorage.getItem("saved"));
    saved.products = saved.products.filter(item => item.item.id !== id);
    localStorage.setItem("saved", JSON.stringify(saved));
    getMusic();
  };

  return (
    <savedContextProvider.Provider
      value={{
        saved: state.saved,

        addMusicToSaved,
        getMusic,
        deleteFromSaved,
      }}>
      {children}
    </savedContextProvider.Provider>
  );
};
export default SavedContextProvider;
