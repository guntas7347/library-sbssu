import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const previousPath = "/dashboard/staff/profile";
  return (
    <div className="text-center">
      <h1 className="my-4">Manage Profile</h1>
      <Button as={Link} to={`${previousPath}/change-password`}>
        Change Password
      </Button>
    </div>
  );
};

export default ProfilePage;
