import { Route, Routes } from "react-router-dom";
import DashboardRoutes from "./dashboard/dashboard.routes";
import LoginPage from "./dashboard/login-page/login-page.page";
import SignUpPage from "./dashboard/login-page/sign-up.page";
import ForgotPassword from "./dashboard/login-page/forgot-password.page";
import Footer from "./components/footer/footer.component";

const App = () => {
  return (
    <div className="app">
      <div>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
