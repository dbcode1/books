import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context";
import axios from "axios";
import uniqid from "uniqid";
import Card from "../../Card/Card";
import LibraryBook from "../../LibraryBook/LibraryBook";
import Results from "../../Results/Results";
import Preview from "../Preview/Preview";
import library from "../../../helpers/books";
import dummyData from "../../../helpers/dummy";
import { getText, getData } from "../../../helpers/getData";
import { libraryBooks } from "../../../helpers/books";
import "./Library.css";

const Library = () => {
  const { data, setData } = useContext(Context);
  const [books, setBooks] = useState([]);
  const libraryBooks = JSON.parse(localStorage.getItem("library"));

  useEffect(() => {
    //getBookInfo()
    if (libraryBooks) {
      console.log("library", libraryBooks);
      setBooks(...books, libraryBooks);
    } else {
      console.log("getbooks");
      getBookInfo();
      console.log("librarybooks", books);
    }
  }, []);

  localStorage.setItem("library", JSON.stringify(books));

  //get localStorage
  // check contents
  // if full save library to books
  // if empty save to library and books
  console.log("BOOKS", books);
  const getBookInfo = async (title) => {
    // make a copy of state
    const allBooks = [];
    //setData({ ...data, results: []})
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
      <ul className="library-wrapper horizontal">
        {books.length > 0 &&
          books.map((book) => {
            return (
              <LibraryBook className="library-book" book={book}></LibraryBook>
            );
          })}
      </ul>
    </Results>
  );
};

export default Library;
