import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import uniqid from "uniqid";
import { getText } from "../../helpers/getData";
import Modal from "react-modal";
import Preview from "../pages/Preview/Preview";
import "./LibraryBook.css";

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
  const navigate = useNavigate();

  const { data, setData } = useContext(Context);
  const img = props.book.img;
  const title = props.book.title;
  const ISBN = props.book.ISBN;
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openPreview() {
    setData({ ...data, showPreview: true });
    setIsOpen(true);
    getPreview(title);
  }

  // get id then call for individual description
  const getPreview = async (id) => {
    localStorage.setItem("ISBN", ISBN);
    console.log("preview");
    navigate("/preview");
  };

  return (
    <>
      <li className="library-book">
        <button
          className="library-button"
          onClick={(e) => openPreview(e, ISBN)}
        >
          Preview
        </button>
        <img
          src={img}
          alt="book cover"
          key={uniqid()}
          className="library-book-cover"
        ></img>
      </li>
      {data.showPreview ? <Preview></Preview> : null}
    </>
  );
};

export default LibraryBook;
