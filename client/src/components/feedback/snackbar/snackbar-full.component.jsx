import SnackbarFeedback from "./snackbar.component";

const SnackbarFeedbackCustom = ({
  showSnackbarFeedback,
  setSnackbarFeedback,
}) => {
  return (
    <div>
      <SnackbarFeedback
        open={showSnackbarFeedback.open}
        message={showSnackbarFeedback.message}
        severity={showSnackbarFeedback.severity}
        handleClose={() =>
          setSnackbarFeedback({ open: false, severity: "", message: "" })
        }
      />
    </div>
  );
};

export default SnackbarFeedbackCustom;
