import { useEffect, useState } from "react";
import useFeedback from "../../../../hooks/useFeedback";
import server from "../../../../services/server.api";
import StatusBanner from "../../../../components/features/dashboard/staff/member/cards/StatusBanner";
import AcademicInformation from "../../../../components/features/dashboard/staff/member/cards/AcademicInformation";
import ProfileCard from "../../../../components/features/dashboard/staff/member/cards/ProfileCard";
import CurrentBooks from "../../../../components/features/dashboard/staff/member/cards/CurrentBooks";
import RecentActivities from "../../../../components/features/dashboard/staff/member/cards/RecentActivities";
import FinancialSummary from "../../../../components/features/dashboard/staff/member/cards/Financial Summary";
import { useParams } from "react-router-dom";
import PageHeader from "../../../../components/header/PageHeader";
import { User } from "lucide-react";
import NotFoundPage from "../../../../components/404/404";

const MemberDetails = ({ onClose = () => {} }) => {
  const setFeedback = useFeedback();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await server.member.fetch(id);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error);
        onClose();
      }
    })();
  }, []);

  if (loading) return <NotFoundPage />;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Member Details"
        svg={User}
        sub="View Member details"
        colorClass="bg-purple-700"
      />
      <StatusBanner data={data} />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-w-6xl gap-8">
        <div className="lg:col-span-1">
          <ProfileCard data={data} />
          <FinancialSummary data={data} />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <AcademicInformation data={data} />
          <CurrentBooks data={data} />
          <RecentActivities data={data} />
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
