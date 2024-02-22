import { Route, Routes } from "react-router-dom";
import NavigationBar from "../components/navbar/navbar.component";
import Homepage from "../pages/homepage/homepage.page.admin";
import ManageBooksRoute from "./manage-books.route.admin";
import ManageStudentsRoute from "./manage-students.route";
import IssueBooksRoute from "./issue-books.route.admin";
import ProfileRoute from "./profile.router";
import ManageStaffRoute from "./manage-staff.route.admin";
import DatabaseRoutes from "./database.routes.admin";
import ManageFinesRoute from "./manage-fines.routes.admin";

const AdminRoutes = () => {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/profile/*" element={<ProfileRoute />} />
        <Route path="/issue-books/*" element={<IssueBooksRoute />} />
        <Route path="/manage-fines/*" element={<ManageFinesRoute />} />
        <Route path="/manage-books/*" element={<ManageBooksRoute />} />
        <Route path="/manage-students/*" element={<ManageStudentsRoute />} />
        <Route path="/manage-staff/*" element={<ManageStaffRoute />} />
        <Route path="/database/*" element={<DatabaseRoutes />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
