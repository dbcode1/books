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
  useEffect(() => {
    setData({ ...data, results: [] });
  }, []);

  const monthNames = [
    "January",
    "December",
    "November",
    "October",
    "September",
    "August",
    "July",
    "June",
    "May",
    "April",
    "March",
    "February",
  ];

  const monthName = (num) => {
    const d = new Date();
    const pastMonth = monthNames[d.getMonth()];
    return pastMonth;
  };

  const datePicker = (num) => {
    const backDate = sub(Date.now(), { months: num });
    const date = format(new Date(backDate), "yyyy/MM/dd");
    const dateFormatted = date.replaceAll("/", "-");
    return dateFormatted;
  };
  const getByDate = async (num) => {
    const date = datePicker(num);
    const url = `https://api.nytimes.com/svc/books/v3/lists/${date}/hardcover-fiction.json?api-key=Qeyh0YahPtTSTYcC6BbEJJKdz9GhZBMG`;
    const response = await getData(url);
    console.log(response);
    setData({ ...data, results: response });
  };

  const date = new Date();
  let month = date.getMonth();
  const months = [];
  for (let i = 0; i < 6; i++) {
    months.push(monthNames[(month + i) % monthNames.length]);
  }
  const onChange = (e) => {
    console.log(differenceInMonths(e.target.value, Date.now));
    console.log(e.target.value);
  };

  return (
    <Results>
      <AnimatedLayout>
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
        <AnimatePresence mode="poplayout">
          <motion.ul
            key={uniqid()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="results-ul"
          >
            {data.results.length > 0
              ? data.results.map((book) => {
                  return <Card book={book}></Card>;
                })
              : null}
          </motion.ul>
        </AnimatePresence>
      </AnimatedLayout>
    </Results>
  );
}
