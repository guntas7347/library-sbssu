import { Route, Routes } from "react-router-dom";
import NavigationBar from "../components/navbar/navbar.component";
import Homepage from "../pages/homepage/homepage.page.admin";
import IssueNewBookPage from "../pages/issue-book/issue-new-book.page.admin";
import ReturnIssuedBookPage from "../pages/return-book/return-issued-book.page.admin";
import SearchIssuedBooks from "../pages/issues/search-issued-books.page.admin";
import SearchReturnedBooks from "../pages/returns/search-returned-books.page.admin";
import SearchMembersPage from "../pages/members/search.page";
import SearchBooksPage from "../pages/books/search-books.page.admin";
import SearchStaffPage from "../pages/staff/search-staff";
import ProfilePage from "../pages/profile/profile.page.admin";
import TransactionsPage from "../pages/transactions/page";
import Page404 from "../../../components/404/404";
import ApplicationsPage from "../pages/applications/page";
import SettingsPage from "../pages/settings/page";
import SupportPage from "../pages/support/page";
import LogsRoutes from "../pages/logs/logs.routes";

const AdminRoutes = () => {
  return (
    <>
      <NavigationBar />
      <div className="admin-dashboard-body">
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/issue-book" element={<IssueNewBookPage />} />
          <Route path="/return-book" element={<ReturnIssuedBookPage />} />
          <Route path="/issues" element={<SearchIssuedBooks />} />
          <Route path="/returns" element={<SearchReturnedBooks />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/books" element={<SearchBooksPage />} />
          <Route path="/members" element={<SearchMembersPage />} />
          <Route path="/staff" element={<SearchStaffPage />} />
          <Route path="/settings/*" element={<SettingsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/logs" element={<LogsRoutes />} />
          <Route path="*" element={<Page404 home="/admin/dashboard" />} />
        </Routes>
      </div>
    </>
  );
};

export default AdminRoutes;
