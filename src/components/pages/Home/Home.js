import React, { useContext } from "react";
import { div } from "framer-motion/client";
import { motion, AnimatePresence } from "framer-motion";
import uniqid from "uniqid";
import "./Home.css";
const Home = (props) => {
  return (
    <AnimatePresence mode="poplayout">
      <motion.div
        key={uniqid()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="results-ul"
      >
        <div className="home-wrapper">
          <h1 className="title">NY Times Best Sellers</h1>
          <p className="caption">
            Checkout a new book, get book descriptions and preview whole books.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
