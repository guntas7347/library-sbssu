import React from "react";
import { Route, Routes } from "react-router-dom";
import ApplicantHomePage from "./applicant.page";
import PrintApplicationPage from "./print-application";
import ApplicationNavBar from "./applicant-header.component";

const ApplicationRouter = () => {
  return (
    <>
      <ApplicationNavBar />
      <Routes>
        <Route index element={<ApplicantHomePage />} />
        <Route path="/print-application" element={<PrintApplicationPage />} />
      </Routes>
    </>
  );
};

export default ApplicationRouter;
