import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  fetchOneApplication,
  processApplication,
} from "../../../hooks/http-requests.hooks.admin";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const ViewApplicantPage = () => {
  const { _id } = useParams();

  const { setFeedback } = useContext(SnackBarContext);

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
          setFeedback({ open: true, message: err, severity: "error" })
        );
    };
    asyncFunc();
  }, []);

  const handleClick = async (e) => {
    const decision = e.target.name;
    await processApplication({ decision, _id })
      .then((res) => {
        setFeedback([1, 1, res]);
        setDecisionTaken(true);
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  return (
    <div className="text-center">
      <h1 className="">Application Details</h1>

      <div className="">
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
          <button name="REJECT" className="my-button" onClick={handleClick}>
            Reject
          </button>

          <button name="APPROVE" className="my-button" onClick={handleClick}>
            Approve
          </button>
        </div>
      )}
    </div>
  );
};
export default ViewApplicantPage;
