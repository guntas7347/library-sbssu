import { Route, Routes } from "react-router-dom";
import ADMIN_NavigationBar from "../components/navbar/navbar.component";
import ADMIN_Homepage from "../pages/homepage/homepage.page.admin";
import ManageBooksRoute from "./manage-books.route.admin";
import ManageStudentsRoute from "./manage-students.route";
import IssueBooksRoute from "./issue-books.route.admin";

const AdminRoutes = () => {
  return (
    <div>
      <ADMIN_NavigationBar />
      <Routes>
        <Route index element={<ADMIN_Homepage />} />
        <Route path="/issue-books/*" element={<IssueBooksRoute />} />
        <Route path="/manage-books/*" element={<ManageBooksRoute />} />
        <Route path="/manage-students/*" element={<ManageStudentsRoute />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
