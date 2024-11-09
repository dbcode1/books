import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Preview.css";
import { ShowContext } from "../../../ModalContext";
import Modal from "../../Modal/Modal";
import "../../Modal/Modal.css";

const Preview = () => {
  // const navigate = useNavigate();
  const { showData, setShowData } = useContext(ShowContext);

  const isbn = localStorage.getItem("ISBN");

  useEffect(() => {
    const reloadCount = sessionStorage.getItem("reloadCount");
    console.log(reloadCount);
    if (reloadCount < 1) {
      sessionStorage.setItem("reloadCount", String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem("reloadCount");
    }
  }, []);

  // google books preview
  console.log("googlebooks");
  // const loadScript = (scriptUrl) => {
  //   const script = document.createElement("script");
  //   script.src = scriptUrl;
  //   document.body.appendChild(script);

  //   return new Promise((res, rej) => {
  //     script.onload = function () {
  //       res();
  //     };
  //     script.onerror = function () {
  //       rej();
  //     };
  //   });
  // };

  // function notFound() {
  //   alert("No Google site for this book");
  // }
  // // use
  // loadScript("https://www.google.com/books/jsapi.js")
  //   .then(() => {
  //     console.log("Script loaded!");
  //     if (isbn) {
  //       window.google.books.load();
  //       function initialize() {
  //         var viewer = new window.google.books.DefaultViewer(
  //           document.getElementById("viewerCanvas")
  //         );
  //         console.log(isbn);
  //         // PUT INTO MODAL
  //         viewer.load(`ISBN:${isbn}`);
  //         // viewer.load("ISBN:9780307743657", notFound);
  //       }

  //       window.google.books.setOnLoadCallback(initialize);
  //     }
  //     setShowData({ show: true });
  //   })
  //   .catch((error) => {
  //     console.error("script not loading", error);
  //   });

  return <div></div>;
};

export default Preview;
