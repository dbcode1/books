import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav/Nav";
import uniqid from "uniqid";

const AnimatedLayout = ({ children }) => {
  return (
    <motion.div
      key={uniqid()}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedLayout;
