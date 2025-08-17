import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../components/404/404";
import ProtectedRoute from "./ProtectedRoute";
import { Loader2 } from "lucide-react";

const StaffRoutes = lazy(() => import("./staff/staff.routes"));
const MemberRoutes = lazy(() => import("./member/MemberRoutes"));

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

export const MemberDashboard = () => {
  return (
    <>
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute userType="member">
              <Suspense fallback={<CenteredSpinner />}>
                <MemberRoutes />
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
    <Loader2
      className={
        "animate-spin min-h-screen text-blue-400 self-center w-10 mx-auto"
      }
    />
  );
};

export default StaffDashboard;
