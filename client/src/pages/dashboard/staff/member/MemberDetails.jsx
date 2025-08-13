// src/pages/staff/member/MemberDetails.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { CreditCard, Edit, FileCheck, User } from "lucide-react";

import server from "../../../../services/server.api";
import useFeedback from "../../../../hooks/useFeedback";
import useAlert from "../../../../hooks/useAlert";

import PageHeader from "../../../../components/header/PageHeader";
import StatusBanner from "../../../../components/features/dashboard/staff/member/cards/StatusBanner";
import AcademicInformation from "../../../../components/features/dashboard/staff/member/cards/AcademicInformation";
import ProfileCard from "../../../../components/features/dashboard/staff/member/cards/ProfileCard";
import CurrentBooks from "../../../../components/features/dashboard/staff/member/cards/CurrentBooks";
import RecentActivities from "../../../../components/features/dashboard/staff/member/cards/RecentActivities";
import FinancialSummary from "../../../../components/features/dashboard/staff/member/cards/Financial Summary";
import QuickActions from "../../../../components/features/common/QuickActions";
import NoDueSlipPage from "./NoDueSlipPage";
import Spinner from "../../../../components/feedback/spinner/Spinner";
import NoDueConfirmation from "../../../../components/features/dashboard/staff/member/NoDueConfirmation";

const MemberDetails = () => {
  const setFeedback = useFeedback();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessingNoDue, setIsProcessingNoDue] = useState(false);
  const navigate = useNavigate();
  const printRef = useRef(null);
  const { id } = useParams();
  const { showAlert, openAlert, closeAlert } = useAlert();

  const fetchMemberData = async () => {
    try {
      setLoading(true);
      const res = await server.member.fetch(id);
      setData(res.data);
    } catch (error) {
      setFeedback(2, error.message || "Failed to fetch member data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMemberData();
    }
  }, [id]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: data?.membershipId || "no-due-slip",
    pageStyle: `@page { size: 210mm 297mm; margin: 0; }`,
  });

  const handleConfirmNoDue = async () => {
    setIsProcessingNoDue(true);
    try {
      const res = await server.member.issueNoDue(id);
      setFeedback(1, res.message || "No-Due Certificate issued successfully.");
      // Refetch the data to get the updated "cleared" status
      await fetchMemberData();
    } catch (error) {
      setFeedback(2, error.message || "Failed to issue No-Due Certificate.");
    } finally {
      setIsProcessingNoDue(false);
      closeAlert();
    }
  };

  if (loading) {
    return <Spinner solo message="Loading member details..." />;
  }

  if (!data) {
    return <div className="text-center p-8">Member not found.</div>;
  }

  const actions = [
    {
      label: "Allot New Card",
      color: "purple",
      svg: CreditCard,
      onClick: () => navigate("allot-card"),
    },
    {
      label: "Edit",
      color: "green",
      svg: Edit,
      onClick: () => navigate("edit"),
    },
    {
      label:
        data.status === "cleared"
          ? "Print No Due Certificate"
          : "Issue No Due Certificate",
      color: "blue",
      svg: FileCheck,
      onClick: () => {
        if (data.status === "cleared") {
          handlePrint();
        } else {
          openAlert(); // Open the confirmation modal
        }
      },
      isLoading: isProcessingNoDue, // Show loading state on the button
    },
  ];

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
          <QuickActions actions={actions} />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <AcademicInformation data={data} />
          <CurrentBooks data={data} />
          <RecentActivities data={data} />
        </div>
      </div>
      {/* The printable component is hidden by default */}
      <NoDueSlipPage ref={printRef} data={data} />
      {/* The confirmation modal */}
      <NoDueConfirmation
        show={showAlert}
        onClose={closeAlert}
        onYes={() => {
          if (confirm("WARNING: ISSUE NO DUE SLIP?")) handleConfirmNoDue();
        }}
        data={data}
      />
    </div>
  );
};

export default MemberDetails;
