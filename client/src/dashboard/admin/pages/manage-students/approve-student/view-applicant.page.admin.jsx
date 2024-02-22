import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchOneApplication,
  processApplication,
} from "../../../hooks/http-requests.hooks.admin";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { Button, Grid } from "@mui/material";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";

const ViewApplicantPage = () => {
  const { _id } = useParams();

  const navigate = useNavigate();

  const [studentDoc, setStudentDoc] = useState({
    rollNumber: "",
    fullName: "",
    fathersName: "",
    gender: "",
    dob: "",
    program: "",
    specialization: "",
    batch: "",
    email: "",
    phoneNumber: "",
  });
  const [decisionTaken, setDecisionTaken] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
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
  } = studentDoc;
  useEffect(() => {
    const asyncFunc = async () => {
      await fetchOneApplication(_id)
        .then((res) => setStudentDoc(res))
        .catch((err) =>
          setSnackbarFeedback({ open: true, message: err, severity: "error" })
        );
    };
    asyncFunc();
  }, []);

  const handleClick = async (e) => {
    const decision = e.target.name;
    await processApplication({ decision, _id })
      .then((res) => {
        setSnackbarFeedback([1, 1, res]);
        setDecisionTaken(true);
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  return (
    <div className="text-center m-3">
      <h1 className="">Application Details</h1>

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
      {!decisionTaken && (
        <div>
          <Grid className="p-5 m-5" container spacing={2}>
            <Grid item>
              <Button
                name="REJECT"
                variant="contained"
                color="error"
                onClick={handleClick}
              >
                Reject
              </Button>
            </Grid>
            <Grid item>
              <Button
                name="APPROVE"
                variant="contained"
                color="success"
                onClick={handleClick}
              >
                Approve
              </Button>
            </Grid>
          </Grid>
        </div>
      )}

      <div>
        <SnackbarFeedbackCustom
          feedback={showSnackbarFeedback}
          handleClose={setSnackbarFeedback}
        />
      </div>
    </div>
  );
};
export default ViewApplicantPage;
