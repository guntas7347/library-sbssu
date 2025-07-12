import { Route, Routes } from "react-router-dom";
import Page404 from "../components/404/404";
import LoginPage from "../pages/login/login-page.page.admin";
// import NavbarPublic from "../pages/public/navbar-public";
import ForgotPassword from "../pages/login/forgot-password.page.admin";
import Navbar from "../components/pages/public/navbar/Navbar";
import Header from "../components/header/Header";
import Footer from "../components/pages/public/footer/Footer";

const LoginRoutes = () => {
  return (
    <div>
      <Header title="University Library" subtitle="Portal Access" backTo="/" />
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default LoginRoutes;
