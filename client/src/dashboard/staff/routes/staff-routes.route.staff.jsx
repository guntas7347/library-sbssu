import { Route, Routes } from "react-router-dom";
import NavigationBar from "../components/navbar/navbar.component";
import Homepage from "../pages/homepage/homepage.page.staff";
import ManageBooksRoute from "./manage-books.route.staff";
import ManageStudentsRoute from "./manage-students.staff";
import IssueBooksRoute from "./issue-books.route.staff";
import ProfileRoute from "./profile.router";
import ManageFinesRoute from "./manage-fines.routes.staff";

const StaffRoutes = () => {
  return (
    <div>
      <NavigationBar />
      <div className="px-10">
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/profile/*" element={<ProfileRoute />} />
          <Route path="/issue-books/*" element={<IssueBooksRoute />} />
          <Route path="/manage-books/*" element={<ManageBooksRoute />} />
          <Route path="/manage-students/*" element={<ManageStudentsRoute />} />
          <Route path="/manage-fines/*" element={<ManageFinesRoute />} />
        </Routes>
      </div>
    </div>
  );
};

export default StaffRoutes;
