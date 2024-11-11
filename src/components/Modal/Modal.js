import "./Modal.css"
import uniqid from "uniqid"
import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <AnimatePresence mode="poplayout">
          <motion.div
            key={uniqid()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="results-ul horizontal"
          >
      <section className="modal-main">
      <button className="close" onClick={handleClose}>X</button>
        {children}
        
      </section>
      </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Modal