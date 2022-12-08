import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../AddMusicPage/AddMusic.css";
import { useProduct } from "../ProductContextProvider";

const AddMusic = () => {
  const { addProduct } = useProduct();

  const [product, setProduct] = useState({
    name: "",
    author: "",
    img: "",
    file: "",
  });

  function handleInput(e) {
    let obj = {
      ...product,
      [e.target.name]: e.target.value,
    };
    setProduct(obj);
  }

  return (
    <div className="main_add_block">
      <div className="home_main_block_2">
        <div className="add_block">
          <div className="title_add_block">
            <h2 className="title_add">Настройки добавления</h2>
          </div>
          <div className="inputs_add_main_block">
            <div className="add_img_block">
              <img src={product.img} name="img" className="add_img" />
            </div>
            <div className="add_button_group">
              <input
                // value={products.img}
                className="inputs_add"
                name="img"
                type="text"
                placeholder="Добавьте картинку(ссылка)"
                onChange={handleInput}
              />
              <input
                // value={products.img}
                className="inputs_add"
                name="genre"
                type="text"
                placeholder="Добавьте жанр"
                onChange={handleInput}
              />
              <input
                // value={products.name}
                className="inputs_add"
                type="text"
                name="name"
                placeholder="добавьте название"
                onChange={handleInput}
              />
              <input
                // value={products.author}
                className="inputs_add"
                type="text"
                name="author"
                placeholder="Добавьте автора"
                onChange={handleInput}
              />
              <input
                // value={products.file}
                className="inputs_add"
                type="text"
                name="file"
                placeholder="Довать музыку(ссылку)"
                onChange={handleInput}
              />
            </div>
          </div>
          {/* <div className="button_add_block"> */}
          <button className="add_button" onClick={() => addProduct(product)}>
            Добавить
          </button>
          <h5 className="add_link">
            <Link to="/home" className="">
              Вернуться назад
            </Link>
          </h5>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddMusic;
