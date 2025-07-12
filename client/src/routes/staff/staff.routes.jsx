import React from "react";
import { Route, Routes } from "react-router-dom";
import ApplicationsPage from "../../pages/dashboard/staff/applicantions/ApplicationPage";
import SettingsPage from "../../pages/dashboard/staff/settings/page";
import Dashboard from "../../components/pages/dashboard/staff/dashBoard/Dashboard";
import SideBar from "../../components/pages/dashboard/staff/sideBar/SideBar";
import Navbar from "../../components/pages/dashboard/staff/navbar/Navbar-2";
import SampleDashboard from "../../pages/dashboard/staff/sample";
import StaffPage from "../../pages/dashboard/staff/staff/StaffPage";
import MemberPage from "../../pages/dashboard/staff/member/MemberPage";
import TransactionDetails from "../../components/pages/dashboard/staff/transaction/TransactionDetails";
import BookDetails from "../../components/pages/dashboard/staff/book/BookDetails";
import IssueBookPage from "../../components/pages/dashboard/staff/issueBook/issueBookPage";
import ReturnBookPage from "../../components/pages/dashboard/staff/returnBook/returnBookPage";

const StaffRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="flex-1 p-6 lg:p-8">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="sample" element={<SampleDashboard />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="members" element={<MemberPage />} />
            <Route path="books" element={<BookDetails />} />
            <Route path="issue-books" element={<IssueBookPage />} />
            <Route path="return-books" element={<ReturnBookPage />} />
            <Route path="transactions" element={<TransactionDetails />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="settings/*" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default StaffRoutes;
