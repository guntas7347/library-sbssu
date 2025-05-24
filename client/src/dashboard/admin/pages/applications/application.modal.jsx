import { useEffect, useState } from "react";
import {
  fetchStudentById,
  processApplication,
} from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";
import { useFeedback } from "../../../../components/context/snackbar.context";
import { UPLOADS_PATH } from "../../../../keys";
import Modal from "../../../../components/modals/modal.component";
import LoadingModal from "../../../../components/modals/loading-modal";
import ConfirmationModal from "../../../../components/modals/confirmation-model";

const ApproveModal = ({ id, onClose }) => {
  const setFeedback = useFeedback();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [btn, setBtn] = useState(true);

  const [decisionTaken, setDecisionTaken] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchStudentById(id);

        setData(res);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
        onClose();
      }
    })();
  }, []);

  const handleApprove = async () => {
    setBtn(false);
    try {
      const res = await processApplication({ decision: "APPROVE", _id: id });
      setFeedback(1, res);
      setDecisionTaken(true);
    } catch (error) {
      setFeedback(2, error);
    }
  };
  const handleReject = async () => {
    setBtn(false);
    if (confirm(`Are you sure of it to REJECT the appliction?`))
      try {
        const res = await processApplication({ decision: "REJECT", _id: id });
        setFeedback(1, res);
        setDecisionTaken(true);
      } catch (error) {
        setFeedback(2, error);
      }
    else setBtn(true);
  };

  if (loading)
    return <LoadingModal onClose={onClose} title="Applicant details" />;

  const imagePath = data.imageUrl
    ? UPLOADS_PATH + data.imageUrl
    : UPLOADS_PATH + "/sample-user.jpg";

  return (
    <>
      <Modal title="Applicant details" onClose={onClose}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="grid gap-6">
            <Input
              disabled={true}
              label="Name"
              name="fullName"
              value={data.fullName}
            />
            <Input
              disabled={true}
              label="Father's Name"
              name="fatherName"
              value={data.fatherName}
            />

            <Input
              disabled={true}
              label="Roll Number"
              name="rollNumber"
              value={data.rollNumber}
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              className="border border-black w-full h-full max-h-full max-w-full object-cover"
              crossOrigin="anonymous"
              src={imagePath}
              alt="image"
            />
          </div>
          <Input
            disabled={true}
            label="Gender"
            name="gender"
            value={data.gender}
          />
          <Input
            disabled={true}
            label="Date Of Birth"
            name="dob"
            type="date"
            value={data.dob.slice(0, 10)}
          />
          <Input
            disabled={true}
            label="Category"
            name="category"
            value={data.category}
          />
          <Input
            disabled={true}
            label="User Type"
            name="role"
            value={data.role}
          />
          <Input
            disabled={true}
            label="Academic Program"
            name="program"
            value={data.program}
          />
          <Input
            disabled={true}
            label="Batch"
            name="batch"
            value={data.batch}
          />
          <Input
            disabled={true}
            label="Email address"
            name="email"
            type="email"
            value={data.email}
          />
          <Input
            disabled={true}
            label="Phone Number"
            name="phoneNumber"
            type="number"
            value={data.phoneNumber}
          />
        </div>
        {!decisionTaken && (
          <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              onClick={async () => await handleReject()}
              disabled={!btn}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => setAlert(true)}
              disabled={!btn}
              className="c-btn-blue"
            >
              Approve
            </button>
          </div>
        )}
      </Modal>
      <ConfirmationModal
        onClose={() => setAlert(false)}
        onYes={handleApprove}
        show={alert}
        title="Are you sure of it to approve the below applicant?"
      >
        <div className="grid grid-cols-2 text-start mb-5">
          <span> Applicant name</span>
          <span> {data.fullName} </span>
          <span> Program</span>
          <span> {data.program} </span>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default ApproveModal;
