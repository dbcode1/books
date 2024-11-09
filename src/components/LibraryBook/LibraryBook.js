import React, { useContext, useEffect } from "react";
import { Context } from "../../Context";
import { ShowContext } from "../../ModalContext";
import uniqid from "uniqid";
import Modal from "../Modal/Modal";
import "./LibraryBook.css";
import "../Card/Card.css";

const customStyles = {
  content: {
    width: "70vw",
    height: "60vh",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const LibraryBook = (props) => {
  const { data, setData } = useContext(Context);
  const img = props.book.img;
  const { showData, setShowData } = useContext(ShowContext);

  const title = props.book.title;
  const ISBN = props.book.ISBN;

  const loadScript = (scriptUrl) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const googleBooks = () => {
    loadScript("https://www.google.com/books/jsapi.js")
      .then(() => {
        if (ISBN) {
          window.google.books.load();

          function initialize() {
            console.log("initialize");
            const viewer = new window.google.books.DefaultViewer(
              document.getElementById("viewerCanvas")
            );
            viewer.load(`ISBN:${ISBN}`);
          }

          window.google.books.setOnLoadCallback(initialize);
        }
      })
      .catch((error) => {
        console.error("Script failed to load", error);
      });
  };

  // Define openPreview outside useEffect
  const openPreview = () => {
    console.log("open preview");
    localStorage.setItem("ISBN", ISBN);
    googleBooks();
    setShowData({ show: true });
  };

  useEffect(() => {
    const reloadCount = sessionStorage.getItem("reloadCount") || 0;
    if (reloadCount < 1) {
      sessionStorage.setItem("reloadCount", String(Number(reloadCount) + 1));
    } else {
      sessionStorage.removeItem("reloadCount");
    }
  }, []);

  const close = () => {
    console.log("close");
    setShowData({ show: false });
  };

  return (
    <div>
      <ul>
        <Modal show={showData.show} handleClose={close} style={customStyles}>
          <div id="viewerCanvas" className="google-viewer"></div>
        </Modal>

        <button className="library-button" onClick={openPreview}>
          Preview
        </button>
        <li className="library-book">
          <img
            src={img}
            alt="book cover"
            key={uniqid()}
            className="library-book-cover"
          ></img>
        </li>
      </ul>
    </div>
  );
};

export default LibraryBook;
