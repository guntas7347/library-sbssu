import { Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/profile/profile.page.admin";

const ProfileRoute = () => {
  return (
    <Routes>
      <Route index element={<ProfilePage />} />
    </Routes>
  );
};

export default ProfileRoute;
