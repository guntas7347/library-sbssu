import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Shield, User, Briefcase, CheckCircle } from "lucide-react";

import server from "../../../../services/server.api";
import useFeedback from "../../../../hooks/useFeedback";
import PageHeader from "../../../../components/header/PageHeader";
import Spinner from "../../../../components/feedback/spinner/Spinner";
import ProfileCard from "../../../../components/features/dashboard/staff/staff/cards/ProfileCard";
import Permissions from "../../../../components/features/dashboard/staff/staff/cards/Permissions";
import StatusBanner from "../../../../components/features/dashboard/staff/staff/cards/StatusBanner";
import InfoCard from "../../../../components/features/common/InfoCard";

const ViewStaffPage = () => {
  const setFeedback = useFeedback();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/staff/dashboard/staff"); // Redirect if no ID
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await server.staff.fetch(id);
        setData(res.data);
      } catch (error) {
        setFeedback(2, error.message || "Failed to fetch staff details.");
        navigate("/staff/dashboard/staff");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return <Spinner solo message="Loading Staff Profile..." />;
  }

  if (!data) {
    return <div className="text-center p-8">Staff member not found.</div>;
  }

  // Data for the Employment InfoCard
  const employmentData = [
    { label: "Employee ID", value: data.employeeId },
    { label: "Department", value: data.department },
    { label: "Designation", value: data.designation, isCapitalized: true },
    {
      label: "Joining Date",
      value: data.joiningDate
        ? new Date(data.joiningDate).toLocaleDateString()
        : "N/A",
    },
    { label: "Status", value: data.employmentStatus, isCapitalized: true },
  ];

  // Data for the Personal InfoCard
  const personalData = [
    { label: "Email Address", value: data.email },
    { label: "Phone Number", value: data.phoneNumber },
    {
      label: "Date of Birth",
      value: data.dateOfBirth
        ? new Date(data.dateOfBirth).toLocaleDateString()
        : "N/A",
    },
    { label: "Gender", value: data.gender, isCapitalized: true },
    { label: "Address", value: data.address },
    { label: "Emergency Contact", value: data.emergencyContact },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="View Staff"
        svg={Shield}
        sub={`Details for ${data.fullName}`}
        colorClass="bg-amber-700"
      />
      <StatusBanner data={data} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileCard data={data} />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <InfoCard
            title="Employment Information"
            svg={<Briefcase />}
            data={employmentData}
          />
          <InfoCard
            title="Personal Information"
            svg={<User />}
            data={personalData}
          />
          <Permissions data={data} />
        </div>
      </div>
    </div>
  );
};

export default ViewStaffPage;
