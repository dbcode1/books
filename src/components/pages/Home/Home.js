import React, { useContext } from "react";
import { motion } from "framer-motion";
import AnimatedLayout from "../../AnimatedLayout";

const Home = (props) => {
  return (
    <AnimatedLayout>
      <h1 className="title">NY Times Best Sellers</h1>
      <p>Checkout a new book, get book descriptions and preview whole books.</p>
    </AnimatedLayout>
  );
};

export default Home;
