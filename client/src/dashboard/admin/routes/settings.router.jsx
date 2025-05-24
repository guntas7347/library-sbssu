import { Route, Routes } from "react-router-dom";

import Page404 from "../../../components/404/404";
import ProgramsSettings from "../pages/settings/programs/programs";
import IssueSettings from "../pages/settings/issue/issue.settings";
import ReturnSettings from "../pages/settings/return/return.settings.";
import LibraryCardSettings from "../pages/settings/library-card/library-card.settings";
import BooksSettings from "../pages/settings/books/page";

const SettingsRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<div>Select Settings to open</div>} />
        <Route path="/programs" element={<ProgramsSettings />} />
        <Route path="/issue" element={<IssueSettings />} />
        <Route path="/return" element={<ReturnSettings />} />
        <Route path="/books" element={<BooksSettings />} />
        <Route path="/library-cards" element={<LibraryCardSettings />} />
        <Route
          path="*"
          element={<Page404 home="/admin/dashboard/settings" />}
        />
      </Routes>
    </>
  );
};

export default SettingsRoutes;
