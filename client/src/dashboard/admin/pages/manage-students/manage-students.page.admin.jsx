import LinkButton from "../../../../components/forms/link-button/link-button.component";

const ManageStudentsPage = () => {
  const previousPath = "/dashboard/admin/manage-students";
  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-5">Manage Students</h1>
      <div className="grid grid-cols-1 gap-5 place-items-center">
        <LinkButton
          to={`${previousPath}/add-student`}
          label="Add new Student"
        />

        <LinkButton
          to={`${previousPath}/add-student/add-student-card`}
          label="Add Library Card"
        />

        <LinkButton
          to={`${previousPath}/approve-students`}
          label="Approve Students"
        />

        <LinkButton
          to={`${previousPath}/search-students`}
          label="Search Students"
        />
      </div>
    </div>
  );
};

export default ManageStudentsPage;
