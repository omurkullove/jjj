import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./Account/RegisterPage";
import LoginPage from "./Account/LoginPage";
import PreviewPage from "./PreviewPage/PreviewPage";
import LogOut from "./logOut/LogOut";
import HomePage from "./Pages/HomePage/HomePage";
import EditPage from "./Pages/HomePage/EditPage/EditPage";
import SavedPage from "./Pages/SavedPage/SavedPage";
import AddMusic from "./Pages/HomePage/AddMusicPage/AddMusic";

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
      path: "/home",
      element: <HomePage />,
      id: 5,
    },
    {
      path: "/edit/:id",
      element: <EditPage />,
      id: 6,
    },
    {
      path: "/saved",
      element: <SavedPage />,
      id: 7,
    },
    {
      path: "/add",
      element: <AddMusic />,
      id: 7,
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
