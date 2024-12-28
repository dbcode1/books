import React, { useEffect, useContext } from "react";
import { Context } from "../../../Context";
import { useLocation } from "react-router-dom";
import "./Best.css";
import { getData } from "../../../helpers/getData";
import Card from "../.././Card/Card";
import Results from "../.././Results/Results";
import { Grid } from "react-loader-spinner";
import uniqid from "uniqid";
import { div } from "framer-motion/client";
import { motion, AnimatePresence } from "framer-motion";
import transition from "../../Transition/Transition";

const Best = () => {
  const { data, setData } = useContext(Context);
  const { pathname } = useLocation();
  useEffect(() => {
    getCurrent();
    console.log("LOAD");
  }, []);

  const getCurrent = async () => {
    console.log("Get Current Best Sellers");
    setData({ ...data, loading: true });
    const url = `https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?api-key=${process.env.REACT_APP_BEST_KEY}&pages=1`;

    const response = await getData(url);
    if (response.message) {
      console.log(response.message);
      setData({ ...data, error: response.message });
      alert(response.message);
    }
    console.log(response);
    const newArr = data.results.slice();
    const newData = [...newArr, ...response];
    setData({ results: [...newData], loading: false });
  };

  return (
    <Results>
      {data.loading && (
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      )}
      {/* <AnimatePresence mode="wait" initial={true}> */}
      <motion.div
        // this fixed animation blinking
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.85 }}
      >
        {data.results.map((book) => {
          return <Card book={book}>CARD</Card>;
        })}
      </motion.div>
      {/* </AnimatePresence> */}
    </Results>
  );
};

export default Best;
