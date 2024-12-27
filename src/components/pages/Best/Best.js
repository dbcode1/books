import React, { useEffect, useContext } from "react";
import { Context } from "../../../Context";
import "./Best.css";
import { getData } from "../../../helpers/getData";
import Card from "../.././Card/Card";
import Results from "../.././Results/Results";
import AnimatedLayout from "../../AnimatedLayout";
import { Grid } from "react-loader-spinner";
import uniqid from "uniqid";
import { div } from "framer-motion/client";
import { motion, AnimatePresence } from "framer-motion";

const Best = () => {
  const { data, setData } = useContext(Context);

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
      {/* <AnimatePresence mode="wait" initial={true}>
        <motion.div
          key={uniqid()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        > */}
      {/* <AnimatedLayout> */}
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

      {data.results.map((book) => {
        return <Card book={book}>CARD</Card>;
      })}

      {/* </AnimatedLayout> */}
      {/* </motion.div>
      </AnimatePresence> */}
    </Results>
  );
};

export default React.memo(Best);
