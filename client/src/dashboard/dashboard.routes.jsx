import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/protected-route/protected-toute.component";
import { Suspense, lazy } from "react";
import Spinner from "../components/feedback/spinner/spinner.component";
import Page404 from "../components/404/404";

const AdminRoutes = lazy(() => import("./admin/routes/admin-routes"));

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
          path="/dashboard/*"
          element={
            <ProtectedRoute role={["STAFF"]}>
              <Suspense fallback={<CenteredSpinner />}>
                <AdminRoutes />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
