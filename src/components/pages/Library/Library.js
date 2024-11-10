import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context";
import axios from "axios";
import uniqid from "uniqid";
import Card from "../../Card/Card";
import LibraryBook from "../../LibraryBook/LibraryBook";
import Results from "../../Results/Results";
import Preview from "../Preview/Preview";
import library from "../../../helpers/books";
import { getText, getData } from "../../../helpers/getData";
import { libraryBooks } from "../../../helpers/books";
import AnimatedLayout from "../../AnimatedLayout";

import "./Library.css";

const Library = () => {
  const { data, setData } = useContext(Context);
  const [books, setBooks] = useState([]);
  const libraryBooks = JSON.parse(localStorage.getItem("library"));

  useEffect(() => {
    //getBookInfo()
    if (libraryBooks) {
      setBooks(...books, libraryBooks);
    } else {
      console.log("getbooks");
      getBookInfo();
      console.log("BOOKS", books)
    }
  }, []);

  localStorage.setItem("library", JSON.stringify(books));

  ;
  const getBookInfo = async (title) => {
    // make a copy of state
    const allBooks = [];
    // loop through titles
    const map = library.map(async (title) => {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCa-pStkt7RVsldVNOZ0s1gZy2GdKNspcs`;
      const response = await getText(url);
      // format response
      const volume = response.data.items[0].volumeInfo;
      const author = volume.authors[0];
      const img = volume.imageLinks.thumbnail;
      if (!volume.industryIdentifiers) {
        return;
      }
      const ISBN = volume.industryIdentifiers[0].identifier;
      const description = volume.description;

      const bookObj = {
        author: author,
        img: img,
        ISBN: ISBN,
        description: description,
      };

      // console.log("book obj ===", bookObj);
      const filterBook = books.filter((b) => b.ISBN === bookObj.ISBN);
      if (filterBook.length) {
        // same data found
        console.log("filterBook ===", filterBook);
      } else {
        allBooks.push(bookObj);
        setBooks([...books, ...allBooks]);
      }
    });
  };

  return (
    <Results>
      <AnimatedLayout>
        <ul className="library-wrapper horizontal">
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
        </ul>
      </AnimatedLayout>
    </Results>
  );
};

export default Library;
