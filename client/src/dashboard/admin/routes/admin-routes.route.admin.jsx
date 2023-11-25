import { Route, Routes } from "react-router-dom";
import ADMIN_NavigationBar from "../components/navbar/navbar.component";
import ADMIN_Homepage from "../pages/homepage/homepage.page.admin";
import ManageBooksRoute from "./manage-books.route.admin";
import ManageStudentsRoute from "./manage-students.route";
import IssueBookPage from "../pages/issue-book/issue-book.page.admin";

const ADMIN_AdminRoutes = () => {
  return (
    <div>
      <ADMIN_NavigationBar />
      <Routes>
        <Route index element={<ADMIN_Homepage />} />
        <Route path="/issue-book" element={<IssueBookPage />} />
        <Route path="/manage-books/*" element={<ManageBooksRoute />} />
        <Route path="/manage-students/*" element={<ManageStudentsRoute />} />
      </Routes>
    </div>
  );
};

export default ADMIN_AdminRoutes;
