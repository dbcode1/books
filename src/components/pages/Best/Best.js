import React, { useEffect, useContext } from "react";
import { Context } from "../../../Context";
import "./Best.css";
import { getData } from "../../../helpers/getData";
import Card from "../.././Card/Card";
import Results from "../.././Results/Results";


const Best = () => {
  const { data, setData } = useContext(Context);
  const getCurrent = async () => {
    const url = `${process.env.REACT_APP_BEST_URL}`;
    const response = await getData(url);

    if (response.message) {
      console.log(response.message);
      setData({ ...data, error: response.message });
      alert(response.message);
    }
    const newArr = data.results.slice()
    const newData =[...newArr, ...response]
    
     //setData({ ...data, results: [...response] });
    setData({ ...data, results: [...newData]})

  };

  useEffect(() => {
    getCurrent();
  }, []);

  return (
    <Results>
      <ul className="results-ul horizontal">
        <li className="error fade">{data.error}</li>
        {data.results.map((book) => {
              return <Card book={book}></Card>;
            })}
        {/* {data.results.length > 0
          ? data.results.map((book) => {
              return <Card book={book}></Card>;
            })
          : null} */}
      </ul>
    </Results>
  );
};

export default Best;
