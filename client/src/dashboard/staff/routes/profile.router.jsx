import { Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/profile/profile.page.staff";
import ChangePasswordPage from "../pages/profile/change-password/change-password.page.staff";

const ProfileRoute = () => {
  return (
    <Routes>
      <Route index element={<ProfilePage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
    </Routes>
  );
};

export default ProfileRoute;
