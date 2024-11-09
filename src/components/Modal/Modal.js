import "./Modal.css"
// import React from 'react';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      <button className="close" onClick={handleClose}>X</button>
        {children}
        
      </section>
    </div>
  );
};

export default Modal