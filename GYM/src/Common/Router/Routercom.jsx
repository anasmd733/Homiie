import React from "react";
import { Path } from "./Router";
import { Route, Routes } from "react-router-dom";
import Index from "../../Page/Index/Index";
import Login from "../../Page/LogIn/Login";
import Home from "../../Page/Home/Home";
import Register from "../../Page/RegisterForm/Register";
import EditProfile from "../../Components/EditProfileCard/EditProfile";
import ViewRegister from "../../Page/ViewRegister/ViewRegister";

export const Routercom = () => {
  const router = [
    {
      Path: Path.Index,
      Component: Index,
    },
    {
      Path: Path.LogIn,
      Component: Login,
    },
    {
      Path: Path.Home,
      Component: Home,
    },
    {
      Path: Path.Register,
      Component: Register,
    },
    {
      Path: Path.ViewRegister,
      Component: ViewRegister,
    },
  ];
  return (
    <>
      <Routes>
        {router.map(({ Path, Component }, i) => (
          <Route path={Path} key={i} Component={Component} />
        ))}
      </Routes>
    </>
  );
};
