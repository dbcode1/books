import React, { useContext } from "react";
import { motion } from "framer-motion";
import AnimatedLayout from "../../AnimatedLayout";
import { div } from "framer-motion/client";
import "./Home.css";
const Home = (props) => {
  return (
    <div className="home-wrapper">
      <AnimatedLayout>
        <h1 className="title">NY Times Best Sellers</h1>
        <p className="caption">
          Checkout a new book, get book descriptions and preview whole books.
        </p>
      </AnimatedLayout>
    </div>
  );
};

export default Home;
