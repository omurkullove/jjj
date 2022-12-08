import usePagination from "@mui/material/usePagination/usePagination";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../EditPage/EditPage.css";
import { useProduct } from "../ProductContextProvider";

const EditPage = () => {
  const { editProduct, getMusicDetails, musicDetails } = useProduct();

  const [products, setProducts] = useState(musicDetails);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getMusicDetails(id);
    console.log(products);
  }, []);

  useEffect(() => {
    setProducts(musicDetails);
  }, [musicDetails]);

  const handleInput = e => {
    let obj = {
      ...products,
      [e.target.name]: e.target.value,
    };
    setProducts(obj);
  };

  return (
    <div className="main_edit_block">
      <div className="home_main_block_2">
        {products ? (
          <div className="edit_block">
            <div className="title_edit_block">
              <h2 className="title_edit">Настройки изменения</h2>
            </div>
            <div className="inputs_edit_main_block">
              <div className="edit_img_block">
                <img src={products.img} className="edit_img" />
              </div>
              <div className="edit_button_group">
                <input
                  value={products.img}
                  className="inputs_edit"
                  name="img"
                  type="text"
                  placeholder="Изменить название"
                  onChange={handleInput}
                />
                <input
                  value={products.name}
                  className="inputs_edit"
                  type="text"
                  name="name"
                  placeholder="Изменить название"
                  onChange={handleInput}
                />
                <input
                  value={products.author}
                  className="inputs_edit"
                  type="text"
                  name="author"
                  placeholder="Изменить название"
                  onChange={handleInput}
                />
                <input
                  value={products.file}
                  className="inputs_edit"
                  type="text"
                  name="file"
                  placeholder="Изменить Трек"
                  onChange={handleInput}
                />
              </div>
            </div>
            {/* <div className="button_edit_block"> */}
            <button
              className="edit_button"
              onClick={() => editProduct(id, navigate, products)}>
              Сохранить
            </button>
            <h5 className="edit_link">
              <Link to="/home" className="">
                Вернуться назад
              </Link>
            </h5>
            {/* </div> */}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default EditPage;
