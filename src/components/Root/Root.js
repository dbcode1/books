import React, {memo} from "react";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import "./Root.css";
import Nav from "../Nav/Nav";
import AnimatedOutlet from "../AnimatedOutlet"
import { Show } from "../../ModalContext"


const Root = () => {

  const location = useLocation();
  return (
    <div>
      <Nav></Nav>
      <AnimatedOutlet />
    </div>
  );
};

export default Root;