import React from "react";
import ConfirmationModal from "../../../../../modals/confirmation-model";

const Confirmation = ({
  show = false,
  onClose = () => {},
  onYes = () => {},
  data = {},
}) => {
  return (
    <ConfirmationModal
      show={show}
      onClose={onClose}
      onYes={onYes}
      title="Are you sure of it to create below book?"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Summary
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Title</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {data.title}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Author</span>
            <span className="font-medium text-green-600 dark:text-green-400">
              {data.author}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Category</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {data.category}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Accessions</span>

            {data?.accessions?.map((a, i) => (
              <span
                key={i}
                className="font-medium text-gray-900 dark:text-white"
              >
                {a.accessionNumber}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ConfirmationModal>
  );
};

export default Confirmation;
