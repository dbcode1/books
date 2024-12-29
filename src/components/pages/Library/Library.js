import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../../Context";
import axios from "axios";
import uniqid from "uniqid";
import Card from "../../Card/Card";
import LibraryBook from "../../LibraryBook/LibraryBook";
import Results from "../../Results/Results";
import Arrow from "../../Arrow/RightArrow";
import library from "../../../helpers/books";
import { getText, getData } from "../../../helpers/getData";
import { AnimatePresence, motion } from "framer-motion";
import { Grid } from "react-loader-spinner";

import "./Library.css";

const Library = () => {
  const { data, setData } = useContext(Context);
  const location = useLocation();

  const [books, setBooks] = useState([]);
  // const libraryBooks = JSON.parse(localStorage.getItem("library"));

  useEffect(() => {
    //setTimeout(getBookInfo, 300);
     getBookInfo();
  }, []);

  //localStorage.setItem("library", JSON.stringify(books));

  const allBooks = [];

  const getBookInfo = async (title) => {
    console.log("get book info");
    // make a copy of state

    library.map((item) => console.log(item));
    const map = library.map(async (title) => {
      console.log(title);
      const url = `https://www.googleapis.com/books/v1/volumes?&q=${title}&maxResults=1&fields=items/volumeInfo(description,industryIdentifiers,imageLinks(thumbnail))&key=${process.env.REACT_APP_GOOGLE_KEY}`;

      const bookPromise = new Promise(function (resolve, reject) {
        console.log("call api");
        const call = fetch(url);
        if (!call.ok) {
          resolve(call);
        }
        reject(new Error("Error in fetching data"));
        return Error;
      });

      bookPromise
        .then((results) => {
          console.log("process data");
          const jsonResults = results.json();
          return jsonResults;
        })
        .then((response) => {
          const volume = response.items[0].volumeInfo;
          if (!volume) {
            return;
          }
          const img = volume.imageLinks.thumbnail;
          if (!volume.industryIdentifiers) {
            return;
          }
          const ISBN = volume.industryIdentifiers[0].identifier;
          const description = volume.description;

          const bookObj = {
            img: img,
            ISBN: ISBN,
            description: description,
          };

          const filterBook = books.filter((b) => b.ISBN === bookObj.ISBN);
          if (filterBook.length) {
            // same data found
            console.log("filterBook ===", filterBook);
          } else {
            console.log("setting book state");
            allBooks.push(bookObj);
            setBooks([...books, ...allBooks]);
            setData({...data, loading: false})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  console.log(books);
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
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          key={uniqid()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="results-ul library-layout"
        >
          {books.length > 0 &&
            books.map((book) => {
              return (
                <LibraryBook
                  location={location}
                  key={location.pathname}
                  // key={uniqid()}
                  className="library-book"
                  book={book}
                ></LibraryBook>
              );
            })}
        </motion.div>
      </AnimatePresence>
    </Results>
  );
};

export default Library;
