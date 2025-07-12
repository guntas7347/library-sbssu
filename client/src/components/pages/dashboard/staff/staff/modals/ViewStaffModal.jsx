import React, { useEffect, useState } from "react";
import useFeedback from "../../../../../../hooks/useFeedback";
import server from "../../../../../../services/server.api";
import Modal from "../../../../../modals/modal.component";
import LoadingModal from "../../../../../modals/loading-modal";
import InfoField from "../../../../../forms/infoField/InfoField ";
import { Shield } from "lucide-react";
import ProfileCard from "../cards/ProfileCard";
import EmploymentInformation from "../cards/EmploymentInformation";
import Permissions from "../cards/Permissions";
import RecentActivities from "../cards/RecentActivities";
import LoginHistory from "../cards/LoginHistory";
import QuickActions from "../cards/QuickActions";
import StatusBanner from "../cards/StatusBanner";
import title from "./ModalTitle";

const ViewStaffModal = ({ id, onClose = () => {} }) => {
  const setFeedback = useFeedback();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.staff.fetch(id);
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
        onClose();
      }
    })();
  }, []);

  if (loading) return <LoadingModal onClose={onClose} title="Staff details" />;

  return (
    <>
      <Modal title={() => title(data)} onClose={onClose}>
        <StatusBanner data={data} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfileCard data={data} />
            <QuickActions />
          </div>
          <div className="lg:col-span-2 space-y-8">
            <EmploymentInformation data={data} />
            <Permissions data={data} />
            <RecentActivities data={data} />
            <LoginHistory data={data} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewStaffModal;
