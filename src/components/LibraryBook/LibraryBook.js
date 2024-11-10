import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import { ShowContext } from "../../ModalContext";
import uniqid from "uniqid";
import Modal from "../Modal/Modal";
import Preview from "../pages/Preview/Preview";
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
  const ISBN = props.book.ISBN;

  const [scriptLoaded, setScriptLoaded] = useState(false);

  const loadScript = (scriptUrl) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${scriptUrl}"]`)) {
        setScriptLoaded(true);
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.onload = () => {
        console.log("Google Books script loaded.");
        setScriptLoaded(true);
        resolve();
      };
      script.onerror = () => {
        console.error("Failed to load Google Books script.");
        reject();
      };
      document.body.appendChild(script);
    });
  };

  const initializeGoogleBooksViewer = () => {
    const viewerCanvas = document.getElementById("viewerCanvas");
    if (window.google && window.google.books && viewerCanvas) {
      try {
        console.log("Initializing Google Books Viewer");
        const viewer = new window.google.books.DefaultViewer(viewerCanvas);
        viewer.load(`ISBN:${viewerCanvas}`, (success) => {
          if (!success) {
            console.error("Failed to load the book preview.");
          } else {
            console.log("Book preview loaded successfully.");
          }
        });
      } catch (error) {
        console.error("Error creating Google Books viewer:", error);
      }
    } else {
      console.error("Google Books API not loaded or viewerCanvas missing.");
    }
  };

  const googleBooks = () => {
    loadScript("https://www.google.com/books/jsapi.js")
      .then(() => {
        if (window.google && window.google.books) {
          window.google.books.load();
          window.google.books.setOnLoadCallback(initializeGoogleBooksViewer);
        } else {
          console.error("Google Books API is not fully loaded.");
        }
      })
      .catch((error) => {
        console.error("Script failed to load:", error);
      });
  };

  const openPreview = () => {
    setShowData({ show: true });
    if (!scriptLoaded) {
      googleBooks();
    } else {
      initializeGoogleBooksViewer();
    }
  };

  const close = () => {
    console.log("Closing book preview modal");
    setShowData({ show: false });
  };

  useEffect(() => {
    const reloadCount = sessionStorage.getItem("reloadCount") || 0;
    if (reloadCount < 1) {
      sessionStorage.setItem("reloadCount", String(Number(reloadCount) + 1));
    } else {
      sessionStorage.removeItem("reloadCount");
    }
  }, []);

  return (
    <div>
      <ul>
        <div id="viewerCanvas" className="google-viewer"></div>

        <Modal
          show={showData.show}
          handleClose={close}
          style={customStyles}
        ></Modal>

        <button className="library-button" onClick={openPreview}>
          Preview
        </button>
        <li className="library-book">
          <img
            src={img}
            alt="book cover"
            key={uniqid()}
            className="library-book-cover"
          />
        </li>
      </ul>
    </div>
  );
};

 export default LibraryBook;
