import { Route, Routes } from "react-router-dom";
import NavigationBar from "../components/navbar/navbar.component.user";
import Homepage from "../pages/homepage/homepage.page.user";
import IssueHistory from "../pages/issue-history/issue-history.page.student";

const UserRoutes = () => {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/issue-history" element={<IssueHistory />} />
      </Routes>
    </div>
  );
};

export default UserRoutes;
