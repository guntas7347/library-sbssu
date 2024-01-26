import { Route, Routes } from "react-router-dom";
import ManageStaffPage from "../pages/manage-staff/manage-staff.page.admin";
import AddStaffPage from "../pages/manage-staff/add-staff/add-staff.page.admin";
import SearchStaffPage from "../pages/manage-staff/search-staff/search-staff.page.admin";
import ViewStaffPage from "../pages/manage-staff/view-staff/view-staff.page.admin";

const ManageStaffRoute = () => {
  return (
    <Routes>
      <Route index element={<ManageStaffPage />} />
      <Route path="/add-new-staff/" element={<AddStaffPage />} />
      <Route path="/search-staff/" element={<SearchStaffPage />} />
      <Route path="/search-staff/view-staff/:_id" element={<ViewStaffPage />} />
    </Routes>
  );
};

export default ManageStaffRoute;
