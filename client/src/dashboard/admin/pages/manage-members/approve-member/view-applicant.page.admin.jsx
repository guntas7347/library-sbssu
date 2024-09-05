import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  fetchOneApplication,
  processApplication,
} from "../../../hooks/http-requests.hooks.admin";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";

const ViewApplicantPage = () => {
  const { _id } = useParams();

  const { setFeedback } = useContext(SnackBarContext);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

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
  const [decision, setDecision] = useState("REJECT");

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
    role,
  } = studentDoc;
  useEffect(() => {
    const asyncFunc = async () => {
      await fetchOneApplication(_id)
        .then((res) => setStudentDoc(res))
        .catch((err) => setFeedback([1, 2, err]));
    };
    asyncFunc();
  }, []);

  const handleClick = async () => {
    await processApplication({ decision, _id })
      .then((res) => {
        setFeedback([1, 1, res]);
        setDecisionTaken(true);
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  console.log(rollNumber);

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">
        Application Details
      </h1>
      <div>
        <SpanningTable
          rows={[
            ["User Type", role],
            [
              `${role === "STUDENT" ? "Roll Number" : "Employee Id"}`,
              rollNumber,
            ],
            ["Name", fullName],
            ["Fathers Name", fathersName],
            ["Gender", gender],
            ["Date Of Birth", new Date(dob).toDateString()],
            [
              `${
                role === "STUDENT" ? "Program" : "Desigination"
              } | Specialization | Batch`,
              `${program} | ${specialization} | ${batch}`,
            ],

            ["Email", email],
            ["Phone Number", phoneNumber],
            ["Application Date", new Date(createdAt).toDateString()],
          ]}
        />
      </div>
      {!decisionTaken && (
        <div className="flex justify-center gap-10 mt-5">
          <button
            name="REJECT"
            className="my-button"
            onClick={() => {
              setDecision("REJECT");
              setShowAlertDialog(true);
            }}
          >
            Reject
          </button>

          <button
            name="APPROVE"
            className="my-button"
            onClick={() => {
              setDecision("APPROVE");
              setShowAlertDialog(true);
            }}
          >
            Approve
          </button>
        </div>
      )}
      <AlertDialog
        content={
          <>
            <div>
              <p>
                Are you sure of it to{" "}
                <span
                  className={`${
                    decision === "APPROVE" ? "text-green-500" : "text-red-500"
                  } font-bold`}
                >
                  {decision}
                </span>{" "}
                the application
              </p>
            </div>
          </>
        }
        open={showAlertDialog}
        handleClick={(e) => {
          if (e) handleClick();
          setShowAlertDialog(false);
        }}
      />
    </div>
  );
};
export default ViewApplicantPage;
