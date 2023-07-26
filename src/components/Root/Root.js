import React from "react";
import { Outlet } from "react-router-dom";
import "./Root.css";
import Nav from "../Nav/Nav";
import getData from "../../helpers/getData";

const Root = () => {
  return (
    <>
      <Nav></Nav>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
