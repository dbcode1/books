import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import uniqid from "uniqid";
import { getText } from "../../helpers/getData";
import Modal from "react-modal";
import Preview from "../pages/Preview/Preview";

import "./Book.css";
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

const Book = (props) => {
  const navigate = useNavigate();
  const { data, setData } = useContext(Context);

  const img = props.book.img;
  const title = props.book.title;
  const ISBN = props.book.ISBN;
  console.log(img)
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setData({ ...data, showPreview: true });
    setIsOpen(true);
    getPreview(title);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setData({ ...data, description: "" });
    setData({ ...data, showPreview: false });
    setIsOpen(false);
  }

  // get id then call for individual description
  const getPreview = async (id) => {
    localStorage.setItem("ISBN", ISBN);

    navigate("/preview")
  };

  return (
    <>
      
      <div className="modal-wrapper" id="modal">
         <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button className="modal-button" onClick={closeModal}>
            X
          </button>
          <h3 className="modal-header">Description</h3>
          {data.showPreview ? <Preview></Preview> : null}
        </Modal> 
      </div>

      <li className="book">
        <button className="open book-button" onClick={(e) => openModal(e, ISBN)}>
          Description
        </button>
        <p>{props.book.name}</p>
        <img src={img} alt="book cover" key={uniqid()} className="bookCover"></img>
      </li>
    </>
  );
};

export default Book;
