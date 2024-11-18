import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context";
import axios from "axios";
import uniqid from "uniqid";
import Card from "../../Card/Card";
import LibraryBook from "../../LibraryBook/LibraryBook";
import Results from "../../Results/Results";
import Arrow from "../../Arrow/RightArrow";
import library from "../../../helpers/books";
import { getText, getData } from "../../../helpers/getData";
import AnimatedLayout from "../../AnimatedLayout";
import { AnimatePresence, motion } from "framer-motion";

import "./Library.css";

const Library = () => {
  const { data, setData } = useContext(Context);
  const [books, setBooks] = useState([]);
  // const libraryBooks = JSON.parse(localStorage.getItem("library"));

  useEffect(() => {
    //getBookInfo();
    // if (libraryBooks) {
    //   console.log(libraryBooks)
    //   setBooks(...books, libraryBooks);
    // } else {
    getBookInfo();
    // }
  }, []);

  //localStorage.setItem("library", JSON.stringify(books));

  const allBooks = [];

  const getBookInfo = async (title) => {
    console.log("get book info");
    // make a copy of state

    const map = library.map(async (title) => {
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
            allBooks.length == 27 && setBooks([...books, ...allBooks]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <Results>
      <AnimatedLayout>
        <AnimatePresence mode="poplayout">
          <motion.ul
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
                    key={uniqid()}
                    className="library-book"
                    book={book}
                  ></LibraryBook>
                );
              })}
          </motion.ul>
        </AnimatePresence>
      </AnimatedLayout>
    </Results>
  );
};

export default Library;
