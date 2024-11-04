import React from "react";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import "./Root.css";
import Nav from "../Nav/Nav";

const Root = () => {
  const location = useLocation();
  return (
    <div>
      <Nav></Nav>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.75 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Root;
