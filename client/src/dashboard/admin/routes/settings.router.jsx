import { Route, Routes } from "react-router-dom";

import Page404 from "../../../components/404/404";
import ProgramsSettings from "../pages/settings/programs/programs";
import IssueSettings from "../pages/settings/issue/issue.settings";

const SettingsRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<div>Select Settings to open</div>} />
        <Route path="/programs" element={<ProgramsSettings />} />
        <Route path="/issue" element={<IssueSettings />} />
        <Route
          path="*"
          element={<Page404 home="/admin/dashboard/settings" />}
        />
      </Routes>
    </>
  );
};

export default SettingsRoutes;
