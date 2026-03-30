"use client";

import { useState } from "react";
import PageHeader from "@/components/pageHeader";
import { BookOpen } from "lucide-react";

import MemberSearch from "./MemberSearch";
import BookSearch from "./BookSearch";
import IssueDuration from "./IssueDuration";
import IssueSummary from "./IssueSummary";

const IssuePage = () => {
  const [issueData, setIssueData] = useState({
    member: null,
    book: null,
    duration: 14,
    dueDateIso: "",
  });

  const handleMemberSelect = (data: any) => {
    setIssueData((prev) => ({
      ...prev,
      member: data || null,
    }));
  };

  const handleBookSelect = (data: any) => {
    setIssueData((prev) => ({
      ...prev,
      book: data || null,
    }));
  };

  return (
    <div className="">
      <PageHeader
        title="Issue Book"
        sub="Checkout desk: Scan patron and book to begin."
        svg={BookOpen}
        colorClass="bg-green-700"
      />

      {/* Simplified 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 items-start">
        {/* LEFT COLUMN: Searches */}
        <MemberSearch onSelect={handleMemberSelect} />

        <BookSearch onSearch={handleBookSelect} />

        <IssueDuration
          onSelect={(isoString) => {
            // Quickly calculate days difference for the summary UI
            const diffTime = Math.abs(new Date(isoString) - new Date());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            setIssueData((prev) => ({
              ...prev,
              duration: diffDays,
              dueDateIso: isoString,
            }));
          }}
        />

        <div className="sticky top-6">
          <IssueSummary data={issueData} />
        </div>
      </div>
    </div>
  );
};

export default IssuePage;
