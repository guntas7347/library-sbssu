import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ApplicationsPage from "../../pages/dashboard/staff/applications/ApplicationPage";
import SideBar from "../../components/features/dashboard/staff/sideBar/SideBar";
import Navbar from "../../components/features/dashboard/staff/navbar/Navbar-2";
import StaffPage from "../../pages/dashboard/staff/staff/StaffPage";
import MemberPage from "../../pages/dashboard/staff/member/MemberPage";
import BookPage from "../../pages/dashboard/staff/books/BooksPage";
import IssuePage from "../../pages/dashboard/staff/issue/IssuePage";
import ReturnPage from "../../pages/dashboard/staff/return/ReturnPage";
import AddBookPage from "../../pages/dashboard/staff/books/AddBookPage";
import AllotCard from "../../pages/dashboard/staff/member/AllotCard";
import SearchIssuesPage from "../../pages/dashboard/staff/searchIssues/SearchIssuesPage";
import SearchReturnPage from "../../pages/dashboard/staff/searchReturn/SearchReturnPage";
import SettingsPage from "../../pages/dashboard/staff/settings/SettingsPage";
import HomePage from "../../pages/dashboard/staff/dashboard/HomePage";
import MemberDetails from "../../pages/dashboard/staff/member/MemberDetails";
import BookDetails from "../../pages/dashboard/staff/books/BookDetails";
import IssueDetails from "../../pages/dashboard/staff/searchIssues/IssueDetails";
import ReturnDetails from "../../pages/dashboard/staff/searchReturn/ReturnDetails";
import TransactionSearchPage from "../../pages/dashboard/staff/transactions/SearchPage";
import TransactionDetailsPage from "../../pages/dashboard/staff/transactions/DetailsPage";
import AddTransaction from "../../pages/dashboard/staff/transactions/AddTransaction";
import StaffProfilePage from "../../pages/dashboard/staff/staff/StaffProfilePage";
import ViewStaffPage from "../../pages/dashboard/staff/staff/ViewStaffPage";
import AddStaffPage from "../../pages/dashboard/staff/staff/AddStaffPage";
import EditStaffPage from "../../pages/dashboard/staff/staff/EditStaffPage";
import EditBook from "../../pages/dashboard/staff/books/EditBook";
import EditMemberPage from "../../pages/dashboard/staff/member/EditMember";

const StaffRoutes = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  return (
    <>
      <Navbar
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="flex">
        <SideBar
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        <div className="flex-1 p-2 lg:p-4">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<StaffProfilePage />} />

            <Route path="applications" element={<ApplicationsPage />} />

            <Route path="members" element={<MemberPage />} />
            <Route path="members/:id" element={<MemberDetails />} />
            <Route path="members/:id/allot-card" element={<AllotCard />} />
            <Route path="members/:id/edit" element={<EditMemberPage />} />

            <Route path="books" element={<BookPage />} />
            <Route path="books/:id" element={<BookDetails />} />
            <Route path="books/add" element={<AddBookPage />} />
            <Route path="books/:id/edit" element={<EditBook />} />

            <Route path="issue-books" element={<IssuePage />} />
            <Route path="return-books" element={<ReturnPage />} />

            <Route path="search-issues" element={<SearchIssuesPage />} />
            <Route path="search-issues/:id" element={<IssueDetails />} />

            <Route path="search-returns" element={<SearchReturnPage />} />
            <Route path="search-returns/:id" element={<ReturnDetails />} />

            <Route path="transactions" element={<TransactionSearchPage />} />
            <Route
              path="transactions/:id"
              element={<TransactionDetailsPage />}
            />
            <Route path="transactions/add" element={<AddTransaction />} />

            <Route path="staff" element={<StaffPage />} />
            <Route path="staff/add" element={<AddStaffPage />} />
            <Route path="staff/edit/:id" element={<EditStaffPage />} />
            <Route path="staff/:id" element={<ViewStaffPage />} />
            <Route path="settings/*" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default StaffRoutes;
