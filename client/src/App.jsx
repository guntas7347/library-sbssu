import { Route, Routes } from "react-router-dom";
import DashboardRoutes from "./dashboard/dashboard.routes";
import Footer from "./components/footer/footer.component";
import AdminLoginPage from "./dashboard/login-page/login-page.page.admin";
import AdminForgotPassword from "./dashboard/login-page/forgot-password.page.admin";
import ResetPasswordPage from "./dashboard/login-page/reset-password";
import Page404 from "./components/404/404";

const App = () => {
  return (
    <div className="app bg-gray-100 dark:bg-gray-700 dark:text-white">
      <div>
        <Routes>
          <Route index element={<AdminLoginPage />} />
          <Route path="/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/reset-password/*" element={<ResetPasswordPage />} />
          <Route path="/admin/*" element={<DashboardRoutes />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
