import React from "react";
import { Outlet } from "react-router-dom";
import "./Root.css";
import Nav from "../Nav/Nav";

const Root = () => {
  return (
    <>
      <Nav></Nav>
      <Outlet />
      
    </>
  );
};

export default Root;
