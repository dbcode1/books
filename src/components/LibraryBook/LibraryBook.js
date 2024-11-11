import React, { useContext, useEffect, useRef } from "react";
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
  const viewerRef = useRef(null);

  const loadScript = async (scriptUrl) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${scriptUrl}"]`)) {
        console.log("Script already loaded");
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.onload = () => {
        console.log("Google Books script loaded.");
        resolve();
      };
      script.onerror = () => {
        console.error("Failed to load Google Books script.");
        reject(new Error("Failed to load script"));
      };
      document.body.appendChild(script);
    });
  };

  const initializeGoogleBooksViewer = () => {
    const viewerCanvas = document.getElementById("viewerCanvas");
    if (window.google && window.google.books && viewerCanvas) {
      console.log("Initializing Google Books Viewer");
      try {
        viewerRef.current = new window.google.books.DefaultViewer(viewerCanvas);
        viewerRef.current.load(`ISBN:${ISBN}`, (success) => {
          if (success) {
            console.log("Book preview loaded successfully.");
          } else {
            console.error("Failed to load the book preview.");
          }
        });
      } catch (error) {
        console.error("Error initializing Google Books Viewer:", error);
      }
    } else {
      console.error(
        "Google Books API not fully loaded or viewerCanvas not found."
      );
    }
  };

  useEffect(() => {
    // setupViewer();
  }, []);

  const setupViewer = async () => {
    console.log("setupViewer");
    try {
      await loadScript("https://www.google.com/books/jsapi.js");
      if (window.google && window.google.books) {
        window.google.books.load();
        window.google.books.setOnLoadCallback(initializeGoogleBooksViewer);
      }
    } catch (error) {
      console.error("Error loading or initializing Google Books API", error);
    }
  };

  const openPreview = () => {
    console.log("Opening book preview modal");
    setShowData({ show: true, selectedBookId: ISBN });
    setupViewer();
    setTimeout(() => {
      initializeGoogleBooksViewer();
    }, 300);
  };

  const close = () => {
    console.log("Closing book preview modal");
    setShowData({ show: false, selectedBookId: null });
  };

  return (
    <div>
      {showData.show && showData.selectedBookId === ISBN && (
        <Modal show={showData.show} handleClose={close} style={customStyles}>
          <div
            id="viewerCanvas"
            className="google-viewer"
            style={{ width: "100%", height: "100%" }}
          ></div>
        </Modal>
      )}
      <ul>
        
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
