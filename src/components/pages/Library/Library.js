import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context";
import axios from "axios";
import uniqid from "uniqid";
import Card from "../../Card/Card";
import Book from "../../Book/Book";
import Results from "../../Results/Results";
import Preview from "../Preview/Preview";
import library from "../../../helpers/books";
import dummyData from "../../../helpers/dummy";
import { getText, getData } from "../../../helpers/getData";
import { libraryBooks } from "../../../helpers/books";
import "./Library.css";

const dummy = [
  {
    author: "king",
    img: "asdfsfdsfsdfdf",
    ISBN: "234234234234",
  },
  {
    author: "kismithng",
    img: "asdfsfsdfdsfsdfdf",
    ISBN: "234234234234",
  },
];
const Library = () => {
  const { data, setData } = useContext(Context);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const libraryBooks = JSON.parse(localStorage.getItem("library"))
      if(libraryBooks){
        setBooks(...books, ...libraryBooks)
      } else {
        //getBookInfo()
        localStorage.setItem("library", JSON.stringify("books"));
      }
    }, []);

  const dummyCall = async () => {
    const url = 'https://api.placeholderjson.dev/shipments/7EBWXB5'
    const response = await axios.get(url)
    console.log(response)
    setBooks(...books, response.data.orderID)
  }
   

  //get localStorage
  // check contents
  // if full save library to books
  // if empty save to library and books
  
  const getBookInfo = async (title) => {
    
    // make a copy of state
    const allBooks = [];
    //setData({ ...data, results: []})
    // loop through titles  
      const map = library.map(async (title) => {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCa-pStkt7RVsldVNOZ0s1gZy2GdKNspcs`;
        setTimeout(() => {}, 1000);
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
            return <Book className="library-book" book={book}></Book>;
          })}
      </ul>
    </Results>
  );
};

export default Library;