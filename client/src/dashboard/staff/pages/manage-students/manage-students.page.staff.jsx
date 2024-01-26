import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ManageStudentsPage = () => {
  const previousPath = "/dashboard/staff/manage-students";
  return (
    <div className="text-center">
      <h1 className="my-4">Manage Students</h1>
      <Button as={Link} to={`${previousPath}/add-student`}>
        Add new Student
      </Button>
      <br />
      <br />
      <Button as={Link} to={`${previousPath}/add-student/add-student-card`}>
        Add Library Card
      </Button>
      <br />
      <br />
      <Button as={Link} to={`${previousPath}/approve-students`}>
        Approve Students
      </Button>
      <br />
      <br />
      <Button as={Link} to={`${previousPath}/search-students`}>
        Search Students
      </Button>
    </div>
  );
};

export default ManageStudentsPage;
