import SnackbarFeedback from "./snackbar-old.component";

const SnackbarFeedbackCustom = ({ feedback = [0, 0, ""], handleClose }) => {
  const handleOpen = () => {
    if (feedback[0] === 1) return true;
    else return false;
  };

  const handleSeverity = () => {
    switch (feedback[1]) {
      case 1:
        return "success";
      case 2:
        return "error";

      default:
        return "info";
    }
  };

  return (
    <div>
      <SnackbarFeedback
        open={handleOpen()}
        message={feedback[2]}
        severity={handleSeverity()}
        handleClose={() =>
          handleClose({
            open: false,
            severity: handleSeverity(),
            message: feedback[2],
          })
        }
      />
    </div>
  );
};

export default SnackbarFeedbackCustom;
