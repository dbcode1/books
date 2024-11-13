import React, { useEffect, useContext } from "react";
import { Context } from "../../../Context";
import "./Best.css";
import { getData } from "../../../helpers/getData";
import Card from "../.././Card/Card";
import Results from "../.././Results/Results";
import AnimatedLayout from "../../AnimatedLayout";

const Best = () => {
  const { data, setData } = useContext(Context);

  useEffect(() => {
    
    getCurrent();
  }, []);

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
    setData({ results: [...newData] });
  };

  return (
    <Results>
      <AnimatedLayout>
        {/* <Arrow></Arrow> */}
        <ul className="results-ul">
          <li className="error fade">{data.error}</li>
          {data.results.map((book) => {
            return <Card book={book}>CARD</Card>;
          })}
        </ul>
      </AnimatedLayout>
    </Results>
  );
};

export default React.memo(Best);
