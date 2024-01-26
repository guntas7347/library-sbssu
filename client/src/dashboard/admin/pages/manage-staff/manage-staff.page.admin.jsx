import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ManageStaffPage = () => {
  const previousPath = "/dashboard/admin/manage-staff";
  return (
    <div className="text-center">
      <h1 className="my-4">Manage Staff</h1>
      <Button as={Link} to={`${previousPath}/add-new-staff`}>
        Add New Staff Member
      </Button>
      <br />
      <br />
      <Button as={Link} to={`${previousPath}/search-staff`}>
        Search Staff Members
      </Button>
    </div>
  );
};

export default ManageStaffPage;
