import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/protected-route/protected-toute.component";
import { Suspense, lazy } from "react";
import Spinner from "../components/feedback/spinner/spinner.component";

const AdminRoutes = lazy(() =>
  import("./admin/routes/admin-routes.route.admin")
);

const StaffRoutes = lazy(() =>
  import("./staff/routes/staff-routes.route.staff")
);
const UserRoutes = lazy(() => import("./student/routes/student-routes.user"));
const ApplicantHomePage = lazy(() => import("./applicant/applicant.page"));

const CenteredSpinner = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <Spinner />
    </div>
  );
};

const DashboardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="ADMIN">
              <Suspense fallback={<CenteredSpinner />}>
                <AdminRoutes />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/*"
          element={
            <ProtectedRoute role="STAFF">
              <Suspense fallback={<CenteredSpinner />}>
                <StaffRoutes />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <ProtectedRoute role="STUDENT">
              <Suspense fallback={<CenteredSpinner />}>
                <UserRoutes />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicant/"
          element={
            <ProtectedRoute role="APPLICANT">
              <Suspense fallback={<CenteredSpinner />}>
                <ApplicantHomePage />
              </Suspense>
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
