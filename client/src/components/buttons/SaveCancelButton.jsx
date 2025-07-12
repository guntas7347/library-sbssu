import React, { useState } from "react";
import ConfirmationModal from "../modals/confirmation-model";

const SaveCancelButton = ({ onSave = () => {}, onCancel = () => {} }) => {
  const [alert, setAlert] = useState(false);

  return (
    <>
      {" "}
      <div className="mt-auto text-right">
        <button
          type="button"
          onClick={onCancel}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Cancel
        </button>
        <button
          type="button"
          className="c-btn-blue"
          onClick={() => setAlert(true)}
        >
          Save
        </button>
      </div>
      <ConfirmationModal
        onClose={() => setAlert(false)}
        onYes={onSave}
        title="Are you sure of it to SAVE?"
        show={alert}
      />
    </>
  );
};

export default SaveCancelButton;
