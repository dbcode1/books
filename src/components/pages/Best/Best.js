import React, { useEffect, useContext } from "react";
import { Context } from "../../../Context";
import "./Best.css";
import { getData } from "../../../helpers/getData";
import Card from "../.././Card/Card";
import Results from "../.././Results/Results";
import AnimatedLayout from "../../AnimatedLayout";

const Best = () => {
  const { data, setData } = useContext(Context);

  const getCurrent = async () => {
    const url = `https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction.json?api-key=Qeyh0YahPtTSTYcC6BbEJJKdz9GhZBMG&pages=1`;
    const response = await getData(url);
    if (response.message) {
      console.log(response.message);
      setData({ ...data, error: response.message });
      alert(response.message);
    }
    console.log(response);
    const newArr = data.results.slice();
    const newData = [...newArr, ...response];

    //setData({ ...data, results: [...response] });
    setData({ ...data, results: [...newData] });
  };

  useEffect(() => {
    setData({ ...data, results: [] });

    getCurrent();
  }, []);

  return (
    <Results>
      <AnimatedLayout>
        <ul className="results-ul horizontal">
          <li className="error fade">{data.error}</li>
          {data.results.map((book) => {
            return <Card book={book}>CARD</Card>;
          })}
          {/* {data.results.length > 0
          ? data.results.map((book) => {
              return <Card book={book}></Card>;
            })
          : null} */}
        </ul>
      </AnimatedLayout>
    </Results>
  );
};

export default Best;
