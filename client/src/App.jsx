import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginRoutes from "./routes/login.routes";
import PublicRoutes from "./routes/public.routes";
import ResetPasswordPage from "./pages/login/reset-password";
import StaffDashboard, { MemberDashboard } from "./routes/dashboard.routes";
import ScrollToTop from "./components/blocks/scrollToTop/ScrollToTop";
import Test from "./test";

const App = () => {
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    isDark && document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 dark:text-white">
      <div>
        <ScrollToTop />
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/login/*" element={<LoginRoutes />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/staff/*" element={<StaffDashboard />} />
          <Route path="/member/*" element={<MemberDashboard />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
