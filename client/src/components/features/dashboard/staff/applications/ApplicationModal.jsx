import { useEffect, useState } from "react";
import useFeedback from "../../../../../hooks/useFeedback";
import server from "../../../../../services/server.api";
import LoadingModal from "../../../../modals/loading-modal";
import Modal from "../../../../modals/modal.component";
import ConfirmationModal from "../../../../modals/confirmation-model";
import ProfileCard from "./cards/ProfileCard";
import AcademicInformation from "./cards/AcademicInformation";
import Actions from "./cards/Actions";
import { User } from "lucide-react";
import StatusBanner from "./cards/Status Banner";
import ApplicationConfirmation from "./Confirmation";
import useAlert from "../../../../../hooks/useAlert";

const ApplicantModal = ({ id, onClose = () => {} }) => {
  const setFeedback = useFeedback();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showAlert, closeAlert, openAlert } = useAlert();
  const [btn, setBtn] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.application.fetch(id);
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
      onClose();
    } catch (error) {
      setFeedback(2, error);
      onClose();
    }
  };
  const handleReject = async () => {
    setBtn(false);
    if (confirm(`Are you sure of it to REJECT the appliction?`))
      try {
        const res = await server.application.process({
          decision: "reject",
          id,
        });
        setFeedback(1, res);
        onClose();
      } catch (error) {
        setFeedback(2, error);
        onClose();
      }
    else setBtn(true);
  };

  if (loading) return <LoadingModal />;

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
              handleApprove={openAlert}
              handleReject={handleReject}
              disabled={data.status !== "applied" || !btn}
            />
          </div>
        </div>
      </Modal>
      <ApplicationConfirmation
        show={showAlert}
        data={data}
        onYes={handleApprove}
        onClose={closeAlert}
      />
    </>
  );
};

export default ApplicantModal;
