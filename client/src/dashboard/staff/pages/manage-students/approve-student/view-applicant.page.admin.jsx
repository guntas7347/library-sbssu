import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchOneApplication,
  processApplication,
} from "../../../hooks/http-requests.hooks.admin";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { Button, Grid } from "@mui/material";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar.component";

const ViewApplicantPage = () => {
  const param = useParams();

  const [studentDoc, setStudentDoc] = useState({
    applicationNumber: null,
    rollNumber: null,
    name: "",
    fathersName: "",
    gender: "",
    dob: "",
    program: "",
    specialization: "",
    batch: "",
    email: "",
    phoneNumber: null,
  });

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const {
    rollNumber,
    applicationNumber,
    name,
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
    const asyncFunc = async () =>
      setStudentDoc(
        await fetchOneApplication({
          applicationNumber: param.applicationNumber,
        })
      );
    asyncFunc();
  }, []);

  const handleClick = async (e) => {
    const decision = e.target.name;
    await processApplication({ applicationNumber, decision })
      .then((res) => {
        setSnackbarFeedback([1, 1, res]);
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  return (
    <div className="text-center">
      <h1 className="">Application Details</h1>
      <Grid className="mx-5" container spacing={2}>
        <Grid item>
          <Button
            name="reject"
            variant="contained"
            color="error"
            onClick={handleClick}
          >
            Reject
          </Button>
        </Grid>
        <Grid item>
          <Button
            name="success"
            variant="contained"
            color="success"
            onClick={handleClick}
          >
            Approve
          </Button>
        </Grid>
      </Grid>

      <div className="m-2">
        <SpanningTable
          rows={[
            ["Application Number", applicationNumber],
            ["Roll Number", rollNumber],
            ["Name", name],
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
        <SnackbarFeedback
          open={showSnackbarFeedback.open}
          message={showSnackbarFeedback.message}
          severity={showSnackbarFeedback.severity}
          handleClose={() =>
            setSnackbarFeedback({ open: false, severity: "info", message: "" })
          }
        />
      </div>
    </div>
  );
};
export default ViewApplicantPage;
