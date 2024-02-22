import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  title = "Confirm?",
  content = "This action can not be undone",
  open,
  handleClick,
  agreeMessage = "Agree",
  disagreeMessage = "Disagree",
}) {
  const handleAgree = () => {
    handleClick(true);
  };
  const handleDisagree = () => {
    handleClick(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>{disagreeMessage}</Button>
          <Button onClick={handleAgree} autoFocus>
            {agreeMessage}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
