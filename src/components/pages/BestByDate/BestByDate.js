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
import AnimatedLayout from "../../AnimatedLayout";

export function BestByDate() {
  const { data, setData } = useContext(Context);

  // const monthNames = [
  //   "December",
  //   "November",
  //   "October",
  //   "September",
  //   "August",
  //   "July",
  //   "June",
  //   "May",
  //   "April",
  //   "March",
  //   "February",
  //   "January"

  // ];

  const monthNames = ["1 month ago", "6", "5", "4", "3", "2"];

  // gets dates from previous months
  const datePicker = (num) => {
    const backDate = sub(Date.now(), { months: num });
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

  const date = new Date();
  let month = date.getMonth() + 1;

  const months = [];
  for (let i = 7; i > 1; i--) {
    months.push(monthNames[(month + i) % monthNames.length]);
    console.log(monthNames);
  }
  console.log(months);
  const onChange = (e) => {
    console.log(differenceInMonths(e.target.value, Date.now));
    console.log(e.target.value);
  };

  return (
    <Results>
      <ul className="date-buttons horizontal" onChange={onChange}>
        {months.map((month, i) => {
          i++;
          return (
            <Link
              className="month"
              activeClassName="active"
              onClick={() => getByDate(i)}
            >
              {month}
            </Link>
          );
        })}
      </ul>
      <AnimatedLayout>
        <AnimatePresence mode="poplayout">
          <motion.ul
            key={uniqid()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="results-ul"
          >
            {data.dateResults &&
              data.dateResults.length > 0 &&
              data.dateResults.map((book) => {
                return <Card book={book}></Card>;
              })}
          </motion.ul>
        </AnimatePresence>
      </AnimatedLayout>
    </Results>
  );
}
