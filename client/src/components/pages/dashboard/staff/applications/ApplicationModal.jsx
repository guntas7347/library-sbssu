import { useEffect, useState } from "react";
import useFeedback from "../../../../../hooks/useFeedback";
import server from "../../../../../services/server.api";
import LoadingModal from "../../../../modals/loading-modal";
import Modal from "../../../../modals/modal.component";
import Button from "../../../../buttons/interactive-button";
import ConfirmationModal from "../../../../modals/confirmation-model";
import ProfileCard from "./cards/ProfileCard";
import AcademicInformation from "./cards/AcademicInformation";
import Actions from "./cards/Actions";
import { User } from "lucide-react";
import Documents from "./cards/Documents";
import StatusBanner from "./cards/Status Banner";

const ApplicantModal = ({ id, onClose = () => {} }) => {
  const setFeedback = useFeedback();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [btn, setBtn] = useState(true);
  const [btn1, setBtn1] = useState(true);

  const [decisionTaken, setDecisionTaken] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.application.fetch(id);
        console.log(res);
        setData(res.data);
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
      const res = await server.application.process({ decision: "approve", id });
      setFeedback(1, res);
      setDecisionTaken(true);
    } catch (error) {
      setFeedback(2, error);
      onClose();
    }
  };
  const handleReject = async () => {
    setBtn1(false);
    if (confirm(`Are you sure of it to REJECT the appliction?`))
      try {
        const res = await server.application.process({
          decision: "reject",
          id,
        });
        setFeedback(1, res);
        setDecisionTaken(true);
      } catch (error) {
        setFeedback(2, error);
        onClose();
      }
    else setBtn1(true);
  };

  if (loading)
    return <LoadingModal onClose={onClose} title="Applicant details" />;

  const showButtons = () => {
    if (decisionTaken) return false;
    if (data.status === "applied") return true;
    return false;
  };

  return (
    <>
      <Modal
        title={() => (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                  Applicant Details
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Application ID: {data.applicationId}
                </p>
              </div>
            </div>
          </div>
        )}
        onClose={onClose}
      >
        <StatusBanner data={data} />
        <div className="grid md:grid-cols-3 gap-8">
          <ProfileCard data={data} />

          <div className="md:col-span-2 space-y-8">
            <AcademicInformation data={data} />
            {/* <Documents /> */}
            <Actions
              handleApprove={() => setAlert(true)}
              handleReject={handleReject}
            />
          </div>
        </div>

        {showButtons() && (
          <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <Button
              onClick={async () => await handleReject()}
              disabled={!btn1}
              className="c-btn-red mt-2"
              label="Reject"
            />
            <Button
              onClick={() => setAlert(true)}
              disabled={!btn}
              label="Approve"
            />
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

export default ApplicantModal;
