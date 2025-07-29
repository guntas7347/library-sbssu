import React, { useState } from "react";
import ConfirmationModal from "../modals/confirmation-model";

const SaveCancelButton = ({ onSave = () => {}, onCancel = () => {} }) => {
  const [alert, setAlert] = useState(false);

  return (
    <>
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={() => setAlert(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Save Changes
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
