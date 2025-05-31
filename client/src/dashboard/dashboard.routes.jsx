import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/protected-route/protected-toute.component";
import { Suspense, lazy } from "react";
import Spinner from "../components/feedback/spinner/spinner.component";
import Page404 from "../components/404/404";
import AdminLoginPage from "./login-page/login-page.page.admin";
import AdminForgotPassword from "./login-page/forgot-password.page.admin";
import ResetPasswordPage from "./login-page/reset-password";
import NavbarPublic from "./public/navbar-public";

const AdminLazy = lazy(() => import("./admin/routes/admin-routes"));

const CenteredSpinner = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen">
      <Spinner />
    </div>
  );
};

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route index element={<AdminRouteLogin />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute role={["STAFF"]}>
              <Suspense fallback={<CenteredSpinner />}>
                <AdminLazy />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

const AdminRouteLogin = () => {
  return (
    <div>
      <NavbarPublic />
      <Routes>
        <Route index element={<AdminLoginPage />} />
        <Route path="/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/reset-password/*" element={<ResetPasswordPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
