import { Route, Routes } from "react-router-dom";
import ManageFinesPage from "../pages/manage-fines/manage-fines.page.staff";
import SearchFinesPage from "../pages/manage-fines/search-fines/search-fines.page";
import ViewFinePage from "../pages/manage-fines/view-fine/view-fine.page.staff";

const ManageFinesRoute = () => {
  return (
    <Routes>
      <Route index element={<ManageFinesPage />} />
      <Route path="/search-fines/" element={<SearchFinesPage />} />
      <Route path="/search-fines/:_id" element={<ViewFinePage />} />
    </Routes>
  );
};

export default ManageFinesRoute;
