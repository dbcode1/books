import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShowContext } from "../../ModalContext";
import { Context } from "../../Context";
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
  const { data, setData } = useContext(Context);

  const img = props.book.book_image;
  const title = props.book.title;

  // get id then call for individual description
  const getSummary = async (title) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.REACT_APP_GOOGLE_KEY}`;
    const response = await getText(url);
    const description = response.data.items[0].volumeInfo.description;
    console.log(description);
    setShowData({ description: description, show: true });
    console.log(showData);
  };

  const open = () => {
    console.log("open", showData.show);
    getSummary(title);
    // setShowData({ show: true });
  };

  const closed = () => {
    console.log("close");
    setShowData({ ...showData, description: "", show: false });
    
  };

  return (
    <ul className="card-list">
      <Modal show={showData.show} handleClose={closed}>
        <p className="description"> {showData.description}</p>
      </Modal>

      <button type="button" className="open" onClick={open}>
        Description
      </button>

      <li className="card">
        <img src={img} alt="book cover" key={uniqid()}></img>
      </li>
    </ul>
  );
};

export default Card;
