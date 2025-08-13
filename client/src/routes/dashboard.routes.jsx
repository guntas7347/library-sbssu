import { lazy } from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../components/404/404";
import ProtectedRoute from "./ProtectedRoute";
import Spinner from "../components/feedback/spinner/Spinner";

const StaffRoutes = lazy(() => import("./staff/staff.routes"));

const StaffDashboard = () => {
  return (
    <>
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute userType="staff">
              <Suspense fallback={<CenteredSpinner />}>
                <StaffRoutes />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

const CenteredSpinner = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <Spinner />
    </div>
  );
};

export default StaffDashboard;
