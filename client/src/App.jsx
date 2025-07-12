import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginRoutes from "./routes/login.routes";
import PublicRoutes from "./routes/public.routes";
import ResetPasswordPage from "./pages/login/reset-password";
import StaffDashboard from "./routes/dashboard.routes";

const App = () => {
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    isDark && document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-700 dark:text-white">
      <div>
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/login/*" element={<LoginRoutes />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/staff/*" element={<StaffDashboard />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
