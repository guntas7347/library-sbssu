import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./admin/routes/admin-routes.route.admin";
import UserRoutes from "./student/routes/student-routes.user";
import ApplicantHomePage from "./applicant/applicant.page";
import ProtectedRoute from "../components/protected-route/protected-toute.component";

const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <ProtectedRoute role="STUDENT">
              <UserRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicant/"
          element={
            <ProtectedRoute role="APPLICANT">
              <ApplicantHomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
{
  /* <ProtectedRoute role="ADMIN">
              <AdminRoutes />
            </ProtectedRoute> */
}
