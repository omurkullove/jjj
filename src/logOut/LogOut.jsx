import React, { useEffect } from "react";
// import Swal from "sweetalert2";
import { useAuth } from "../Account/AuthContextProvider";
import swal from "sweetalert";
const LogOut = () => {
  const {
    currentUser,
    logoutUser,
    setCurrentUser,
    checkAuth,
    getTracks,
    deleteAccount,
  } = useAuth();

  useEffect(() => {
    setCurrentUser(localStorage.getItem("username"));
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("tokens")) {
  //     checkAuth();
  //   }
  // }, []);

  // useEffect(() => {
  //   getTracks();
  // }, []);

  return (
    <div>
      <h1>{currentUser ? `${currentUser}` : "NO USER"}</h1>
      {currentUser ? (
        <button
          style={{ width: "100px", height: "100px" }}
          onClick={() => logoutUser()}>
          LOG OUT
        </button>
      ) : null}
      {currentUser ? (
        <button
          style={{ width: "100px", height: "100px" }}
          onClick={() => {
            swal({
              title: "Вы уверены??",
              text: "После удаления восстановление не возможно!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then(willDelete => {
              if (willDelete) {
                swal({
                  icon: "success",
                  title: "оууу щиииит....",
                  text: "Аккаунт успешно удален!",
                });
                deleteAccount();
                // console.log("its working!");
              } else {
                swal("Фуух, аккаунт сохранен");
              }
            });
          }}>
          Delete
        </button>
      ) : null}
    </div>
  );
};

export default LogOut;
