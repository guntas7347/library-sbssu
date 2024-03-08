import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = ({
  title = "Confirm?",
  content = "This action can not be undone",
  open,
  handleClick,
  agreeMessage = "Agree",
  disagreeMessage = "Disagree",
}) => {
  const handleAgree = () => {
    handleClick(true);
  };
  const handleDisagree = () => {
    handleClick(false);
  };

  return (
    <div
      className={`${
        !open && "hidden"
      } fixed z-50 left-0 top-0 h-full w-full bg-black bg-opacity-50 flex justify-center`}
    >
      <div className="bg-white p-10 m-auto">
        <h1>{title}</h1>
        {content}
        <div className="flex gap-5">
          <button className="my-button" onClick={handleDisagree}>
            Disagree
          </button>
          <button className="my-button" onClick={handleAgree}>
            Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export const AlertDialogBB = ({ content }) => {
  return (
    <div className="fixed z-50 left-0 top-0 h-full w-full bg-black bg-opacity-50 flex justify-center">
      <div className="bg-white p-10 m-auto">
        <h1>Confirm</h1>
        <p>This action can not be undone</p>
        {content}
        <div>
          <button>Disagree</button>
          <button>Agree</button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
