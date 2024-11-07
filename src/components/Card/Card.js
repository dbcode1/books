import React, { useContext, useState, useRef, memo } from "react";
import { useNavigate } from "react-router-dom";
import { ShowProvider } from "../../ModalContext";
import { ShowContext } from "../../ModalContext";
import uniqid from "uniqid";
import { getText } from "../../helpers/getData";
import Modal from "../Modal/Modal";

import "./Card.css";

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

const Card = (props) => {
  const navigate = useNavigate();
  const { showData, setShowData } = useContext(ShowContext);

  const img = props.book.book_image;
  const title = props.book.title;

  // get id then call for individual description
  const getSummary = async (title) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.REACT_APP_GOOGLE_KEY}`;
    const response = await getText(url);
    const description = response.data.items[0].volumeInfo.description;
    setShowData({ ...showData, description: description });
  };
  
  
  const open = () => {
    console.log("open");
    setShowData({ show: true });
    setTimeout(getSummary, 3000);
  };

  const closed = () => {
    console.log("close");
    setShowData({ ...showData, show: false });
  };

  return (
    <>
      <main>
        <Modal show={showData.show} handleClose={closed}>
          <p> {showData.description}</p>
        </Modal>

        <button type="button" className="open" onClick={open}>
          Description
        </button>

        <li className="card">
          <img src={img} alt="book cover" key={uniqid()}></img>
        </li>
      </main>
    </>
  );
};

export default Card;
