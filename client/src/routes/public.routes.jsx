import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../components/404/404";
import LandingPage from "../pages/public/landingpage";
import JoinPage from "../pages/public/JoinPage";
import AppliedPage from "../pages/public/applied";
import PrivacyPolicyPage from "../pages/public/privacy-policy.page";
import TermsAndConditionsPage from "../pages/public/terms-and-conditions.page";
import DeveloperPage from "../pages/public/developer.page";
import Footer from "../components/features/public/footer/Footer";
import AboutPage from "../pages/public/AboutPage";
import ApplicationNotFound from "../pages/public/NoApplicationPage";
import Navbar from "../components/features/public/navbar/Navbar";
import Catalogue from "../pages/public/Catalogue";

const PublicRoutes = () => {
  return (
    <div>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/join/applied" element={<AppliedPage />} />
        <Route path="/join/applied/404" element={<ApplicationNotFound />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditionsPage />}
        />
        <Route path="/developer" element={<DeveloperPage />} />
        <Route path="/about" element={<AboutPage />} />{" "}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <NotFoundPage />
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default PublicRoutes;
