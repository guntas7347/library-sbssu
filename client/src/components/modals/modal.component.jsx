import React from "react";
import ModalCloseButton from "../buttons/svg-buttons/close-button";

const Modal = ({ onClose, children, title }) => {
  return (
    <div>
      <div className=" flex inset-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <ModalCloseButton onClose={onClose} />
            </div>
            <div className="p-4 md:p-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
