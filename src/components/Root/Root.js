import React, { memo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./Root.css";
import Nav from "../Nav/Nav";
import { AnimatePresence, motion } from "framer-motion";

import { Show } from "../../ModalContext";

const Root = () => {
  const location = useLocation();
  return (
    <div>
      <Nav></Nav>
      {/* <AnimatePresence mode="wait" initial={true}>
        <Outlet location={location} key={location.pathname} />
      </AnimatePresence> */}
      <Outlet />
    </div>
  );
};

export default Root;
