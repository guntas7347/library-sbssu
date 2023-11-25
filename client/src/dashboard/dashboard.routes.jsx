import { Route, Routes } from "react-router-dom";
import ADMIN_AdminRoutes from "./admin/routes/admin-routes.route.admin";

const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/*" element={<ADMIN_AdminRoutes />} />
        <Route path="/student/*" />
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
