import SpanningTable from "../../components/table/spanning-table.component";
import { deleteApplication } from "../http-requests";
import { useContext, useState } from "react";
import AlertDialog from "../../components/feedback/dialog/alert-dialog.component";
import { SnackBarContext } from "../../components/context/snackbar.context";
import { Link } from "react-router-dom";

const AppliedStatusPage = ({ applicationDoc }) => {
  const { setFeedback } = useContext(SnackBarContext);

  const [showAlertDialog, setShowAlertDialog] = useState(false);

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
        setFeedback({
          severity: "success",
          open: true,
          message: res.message,
        })
      )
      .catch((err) => setFeedback([1, 2, err]));
    window.location.reload();
  };

  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-bold my-5">
        Application Details
      </h2>
      <div className="px-3 md:px-5 text-xs md:text-base">
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
        <p className="font-extrabold">
          Incorrect Details? Withdraw your application and submit again
        </p>
      </div>
      <div className="my-3 flex gap-10 items-center justify-center">
        <button className="my-button" onClick={() => setShowAlertDialog(true)}>
          Withdraw Application
        </button>
        <Link to={"print-application"}>
          <button className="my-button">Print Application</button>
        </Link>
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
      </div>
    </div>
  );
};
export default AppliedStatusPage;
