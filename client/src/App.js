import { Link, Route, Routes } from "react-router-dom";
import DashboardRoutes from "./dashboard/dashboard.routes";
import { Button } from "@mui/material";
import LoginPage from "./dashboard/login-page/login-page.page";
import SignUpPage from "./dashboard/login-page/sign-up.page";
import ForgotPassword from "./dashboard/login-page/forgot-password.page";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </div>
  );
};

export default App;
