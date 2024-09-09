import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/homepage/homepage.page.user";

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default UserRoutes;
