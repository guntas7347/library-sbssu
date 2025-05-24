import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./homepage";
import JoinPage from "./join/join.page";
import AppliedPage from "./join/applied.page";
import NavbarPublic from "./navbar-public";
import Page404 from "../../components/404/404";
import ContactPage from "./contact.page";
import PrivacyPolicyPage from "./privacy-policy.page";
import TermsAndConditionsPage from "./terms-and-conditions.page";
import DeveloperPage from "./developer.page";
import AboutPage from "./about.page";

const PublicRoutes = () => {
  return (
    <div>
      <NavbarPublic />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/join/applied" element={<AppliedPage />} />
        <Route path="*" element={<Page404 support="/contact" />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditionsPage />}
        />{" "}
        <Route path="/developer" element={<DeveloperPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
};

export default PublicRoutes;
