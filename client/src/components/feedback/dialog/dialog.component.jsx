import React from "react";

const Dialog = ({ children, onClose }) => {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-1 bg-slate-600/90">
      <div
        onClick={handleClose}
        className="flex justify-center h-screen items-center "
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
