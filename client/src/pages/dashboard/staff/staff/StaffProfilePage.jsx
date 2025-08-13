import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Edit,
  Mail,
  Phone,
  Briefcase,
  Shield,
  MapPin,
} from "lucide-react";

import server from "../../../../services/server.api";
import useFeedback from "../../../../hooks/useFeedback";
import PageHeader from "../../../../components/header/PageHeader";
import Spinner from "../../../../components/feedback/spinner/Spinner";
import QuickActions from "../../../../components/features/common/QuickActions";
import ProfileCard from "../../../../components/features/dashboard/staff/profile/ProfileCard";
import ActivityHistory from "../../../../components/features/dashboard/staff/profile/ActivityHistory";
import InfoCard from "../../../../components/features/common/InfoCard"; // Using the generic InfoCard

const StaffProfilePage = () => {
  const navigate = useNavigate();
  const setFeedback = useFeedback();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await server.staff.fetchProfile();
        setData(res.data);
      } catch (error) {
        setFeedback(2, error);
        navigate("/staff/dashboard");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <Spinner solo message="Loading Staff Profile..." />;
  }

  if (!data) {
    return <div className="text-center p-8">Staff member not found.</div>;
  }

  const employmentData = [
    { label: "Employee ID", value: data.employeeId },
    { label: "ID Number", value: data.idNumber },
    { label: "Department", value: data.department },
    { label: "Designation", value: data.designation, isCapitalized: true },
    {
      label: "Joining Date",
      value: data.joiningDate
        ? new Date(data.joiningDate).toLocaleDateString()
        : "N/A",
    },
    {
      label: "Employment Status",
      value: data.employmentStatus,
      isCapitalized: true,
    },
  ];

  const contactData = [
    { label: "Email Address", value: data.email, icon: Mail },
    { label: "Phone Number", value: data.phoneNumber, icon: Phone },
    { label: "Address", value: data.address, icon: MapPin },
    { label: "Emergency Contact", value: data.emergencyContact, icon: Shield },
    {
      label: "Date of Birth",
      value: data.dateOfBirth
        ? new Date(data.dateOfBirth).toLocaleDateString()
        : "N/A",
    },
    { label: "Gender", value: data.gender, isCapitalized: true },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Staff Profile"
        svg={User}
        sub={`Details for ${data.fullName}`}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <ProfileCard data={data} />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-6">
          <InfoCard
            title="Employment Details"
            svg={<Briefcase className="text-red-400" />}
            data={employmentData}
          />
          <InfoCard
            title="Contact & Personal Info"
            svg={<User />}
            data={contactData}
          />
          <ActivityHistory data={data.activityHistory} />
        </div>
      </div>
    </div>
  );
};

export default StaffProfilePage;
