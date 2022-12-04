import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./Account/RegisterPage";
import LoginPage from "./Account/LoginPage";
import PreviewPage from "./PreviewPage/PreviewPage";
import LogOut from "./logOut/LogOut";
import RestorePassword from "./Account/RestorePassword/RestorePassword";
import SetRestorePassword from "./Account/RestorePassword/SetRestorePassword";
import GetMusic from "./MusicTest/GetMusic";
import ChangePassword from "./ChangePassword/ChangePassword";

const MainRoutes = () => {
  const ALL_PAGES = [
    {
      path: "/register",
      element: <RegisterPage />,
      id: 1,
    },
    {
      path: "/login",
      element: <LoginPage />,
      id: 2,
    },
    {
      path: "/",
      element: <PreviewPage />,
      id: 3,
    },
    {
      path: "/logout",
      element: <LogOut />,
      id: 4,
    },
    {
      path: "/restore-pass",
      element: <RestorePassword />,
      id: 5,
    },
    {
      path: "/setRestore-pass",
      element: <SetRestorePassword />,
      id: 6,
    },
    {
      path: "/getMusic",
      element: <GetMusic />,
      id: 7,
    },
    {
      path: "/changePass",
      element: <ChangePassword />,
      id: 8,
    },
  ];

  return (
    <>
      <Routes>
        {ALL_PAGES.map(item => (
          <Route path={item.path} element={item.element} key={item.id} />
        ))}
      </Routes>
    </>
  );
};

export default MainRoutes;
