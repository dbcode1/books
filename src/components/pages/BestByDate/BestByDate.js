import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../Context";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import sub from "date-fns/sub";
import uniqid from "uniqid";
import differenceInMonths from "date-fns/differenceInMonths";
import "./BestByDate.css";
import { getData } from "../../../helpers/getData";
import Card from "../../Card/Card";
import Results from "../.././Results/Results";
import { Audio } from "react-loader-spinner";

export function BestByDate() {
  const { data, setData } = useContext(Context);

  // const monthNames = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "June",
  //   "July",
  //   "Aug",
  //   "Sept",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];

  const monthNames = ["1 month ago", 2, 3, 4, 5, 6];

  // gets dates from previous months
  const datePicker = (num) => {
    const backDate = sub(Date.now(), { months: num });
    console.log(backDate);
    const date = format(new Date(backDate), "yyyy/MM/dd");
    const dateFormatted = date.replaceAll("/", "-");
    console.log(dateFormatted);
    return dateFormatted;
  };
  const getByDate = async (num) => {
    const date = datePicker(num);
    const url = `https://api.nytimes.com/svc/books/v3/lists/${date}/hardcover-fiction.json?api-key=Qeyh0YahPtTSTYcC6BbEJJKdz9GhZBMG`;
    const response = await getData(url);
    console.log(response);
    setData({ ...data, dateResults: response });
  };

  const onChange = (e) => {
    console.log(differenceInMonths(e.target.value, Date.now));
    console.log(e.target.value);
  };

  return (
    <Results>
      {data.loading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      )}
      <ul className="date-buttons horizontal" onChange={onChange}>
        {monthNames.map((month, i) => {
          i++;
          return (
            <Link
              key={uniqid()}
              className="month"
              activeClassName="active"
              onClick={() => getByDate(i)}
            >
              {month}
            </Link>
          );
        })}
      </ul>
      <motion.ul
        key={uniqid()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="results-ul"
      >
        {data.dateResults &&
          data.dateResults.length > 0 &&
          data.dateResults.map((book) => {
            return <Card key={uniqid()} book={book}></Card>;
          })}
      </motion.ul>
    </Results>
  );
}
