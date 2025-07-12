import { Route, Routes } from "react-router-dom";
import Page404 from "../../components/404/404";
import ProgramsSettings from "../../pages/dashboard/staff/settings/programs/programs";
import IssueSettings from "../../pages/dashboard/staff/settings/issue/issue.settings";

const SettingsRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<div>Select Settings to open</div>} />
        <Route path="/programs" element={<ProgramsSettings />} />
        <Route path="/issue" element={<IssueSettings />} />
        {/* <Route path="/return" element={<ReturnSettings />} />
        <Route path="/books" element={<BooksSettings />} />
        <Route path="/auth" element={<AuthSettings />} />
        <Route path="/library-cards" element={<LibraryCardSettings />} /> */}
        <Route
          path="*"
          element={<Page404 home="/admin/dashboard/settings" />}
        />
      </Routes>
    </>
  );
};

export default SettingsRoutes;
