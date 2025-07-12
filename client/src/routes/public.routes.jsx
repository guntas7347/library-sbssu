import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/public-old/homepage";
// import JoinPage from "../pages/public/join/join.page";
// import AppliedPage from "../pages/public/join/applied.page";
// import ContactPage from "../pages/public-old/contact.page";
// import PrivacyPolicyPage from "../pages/public-old/privacy-policy.page";
// import TermsAndConditionsPage from "../pages/public-old/terms-and-conditions.page";
// import DeveloperPage from "../pages/public-old/developer.page";
// import AboutPage from "../pages/public-old/about.page";
import Page404 from "../components/404/404";
import LandingPage from "../pages/public/landingpage";
import JoinPage from "../pages/public/JoinPage";
import AppliedPage from "../pages/public/applied";
import PrivacyPolicyPage from "../pages/public/privacy-policy.page";
import TermsAndConditionsPage from "../pages/public/terms-and-conditions.page";
import DeveloperPage from "../pages/public/developer.page";
import Footer from "../components/pages/public/footer/Footer";

const PublicRoutes = () => {
  return (
    <div>
      {/* <NavbarPublic /> */}
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/join/applied" element={<AppliedPage />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditionsPage />}
        />
        <Route path="/developer" element={<DeveloperPage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default PublicRoutes;
