import React from "react";
import Spinner from "../feedback/spinner/Spinner";
import Modal from "./modal.component";

const LoadingModal = ({ onClose, title = "" }) => {
  return (
    <Modal onClose={onClose} title={title}>
      <div className="min-h-96 flex justify-center items-center">
        <Spinner />
      </div>
    </Modal>
  );
};

export default LoadingModal;
