import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LinkButton from "../../../../components/forms/link-button/link-button.component";

const ManageStudentsPage = () => {
  const previousPath = "/dashboard/admin/manage-students";
  return (
    <div className="text-center">
      <h1 className="my-4">Manage Students</h1>
      <LinkButton to={`${previousPath}/add-student`} label="Add new Student" />
      <br />
      <br />
      <LinkButton
        to={`${previousPath}/add-student/add-student-card`}
        label="Add Library Card"
      />
      <br />
      <br />
      <LinkButton
        to={`${previousPath}/approve-students`}
        label="Approve Students"
      />
      <br />
      <br />
      <LinkButton
        to={`${previousPath}/search-students`}
        label="Search Students"
      />
    </div>
  );
};

export default ManageStudentsPage;
