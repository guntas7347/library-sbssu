import { Button } from "@mui/material";
import SpanningTable from "../../components/table/spanning-table.component";
import { deleteApplication } from "../http-requests";
import { useState } from "react";
import AlertDialog from "../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedbackCustom from "../../components/feedback/snackbar/snackbar-full.component";

const AppliedStatusPage = ({ applicationDoc }) => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    severity: "info",
    message: "",
    open: false,
  });

  const {
    rollNumber,
    fullName,
    fathersName,
    gender,
    dob,
    program,
    specialization,
    batch,
    email,
    phoneNumber,
    createdAt,
  } = applicationDoc;

  const handleWithdraw = async () => {
    await deleteApplication()
      .then((res) =>
        setSnackbarFeedback({
          severity: "success",
          open: true,
          message: res.message,
        })
      )
      .catch((err) => setSnackbarFeedback([1, 2, err]));
    window.location.reload();
  };

  return (
    <div>
      <h1 className="">Your application is under review.</h1>
      <h3>Application Details</h3>
      <div className="m-2">
        <SpanningTable
          rows={[
            ["Roll Number", rollNumber],
            ["Name", fullName],
            ["Fathers Name", fathersName],
            ["Gender", gender],
            ["Date Of Birth", new Date(dob).toDateString()],
            ["Program", program],
            ["Specialization", specialization],
            ["Batch", batch],
            ["Email", email],
            ["Phone Number", phoneNumber],
            ["Application Date", new Date(createdAt).toDateString()],
          ]}
        />
      </div>
      <div>
        <Button onClick={() => setShowAlertDialog(true)}>
          Withdraw Application
        </Button>
      </div>
      <div>
        <AlertDialog
          title="Confirm?"
          content="This action can not be undone"
          open={showAlertDialog}
          handleClick={(e) => {
            if (e) handleWithdraw();
            setShowAlertDialog(false);
          }}
        />
        <SnackbarFeedbackCustom
          feedback={showSnackbarFeedback}
          handleClose={setSnackbarFeedback}
        />
      </div>
    </div>
  );
};
export default AppliedStatusPage;
