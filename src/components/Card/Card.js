import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import uniqid from "uniqid";
import { getText } from "../../helpers/getData";
import Modal from "../Modal/Modal";
import ReactDom from "react-dom";
import { Transition } from "react-transition-group";

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
  const { data, setData } = useContext(Context);

  const img = props.book.book_image;
  const title = props.book.title;

  // get id then call for individual description
  const getSummary = async (title) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${process.env.REACT_APP_GOOGLE_KEY}`;
    const response = await getText(url);
    console.log(response)
    const description = response.data.items[0].volumeInfo.description;
    setData({ ...data, description: description });
  };
  const [show, setShow] = useState(false);

  const open = () => {
    console.log("open");
    setShow(true);
    getSummary(title);
  };

  const closed = () => {
    console.log("close");
    setShow(false);
  };

  return (
    <>
      <main>
        <Modal show={show} handleClose={closed}>
          <p> {data.description}</p>
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
