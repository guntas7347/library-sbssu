import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardRoutes from "./dashboard/dashboard.routes";
import Footer from "./components/footer/footer.component";
import AdminLoginPage from "./dashboard/login-page/login-page.page.admin";
import AdminForgotPassword from "./dashboard/login-page/forgot-password.page.admin";
import ResetPasswordPage from "./dashboard/login-page/reset-password";
import PublicRoutes from "./dashboard/public/public.routes";

const App = () => {
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    isDark && document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="app bg-gray-100 dark:bg-gray-700 dark:text-white">
      <div>
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route
            path="/admin/forgot-password"
            element={<AdminForgotPassword />}
          />
          <Route
            path="/admin/reset-password/*"
            element={<ResetPasswordPage />}
          />
          <Route path="/admin/*" element={<DashboardRoutes />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
