import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../components/404/404";
import ProgramsSettings from "../../pages/dashboard/staff/settings/ProgramsSettings";
import DefaultPage from "../../pages/dashboard/staff/settings/DefaultPage";
import IssueSettings from "../../pages/dashboard/staff/settings/IssueSettings";
import LibraryCardSettings from "../../pages/dashboard/staff/settings/LibraryCardSettings";
import ReturnSettings from "../../pages/dashboard/staff/settings/ReturnSettings";
import BooksSettings from "../../pages/dashboard/staff/settings/BooksSettings";
import SecuritySettings from "../../pages/dashboard/staff/settings/SecuritySettings";
import MembersSettings from "../../pages/dashboard/staff/settings/MemberSettings";

const SettingsRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<DefaultPage />} />
        <Route path="/programs" element={<ProgramsSettings />} />
        <Route path="/issue" element={<IssueSettings />} />
        <Route path="/return" element={<ReturnSettings />} />
        <Route path="/books" element={<BooksSettings />} />
        <Route path="/members" element={<MembersSettings />} />
        <Route path="/library-cards" element={<LibraryCardSettings />} />
        <Route path="/security" element={<SecuritySettings />} />
        <Route
          path="*"
          element={<NotFoundPage home="/admin/dashboard/settings" />}
        />
      </Routes>
    </>
  );
};

export default SettingsRoutes;
