import LinkButton from "../../../../components/forms/link-button/link-button.component";

const ManageStaffPage = () => {
  const previousPath = "/dashboard/admin/manage-staff";
  return (
    <div className="text-center">
      <h1 className="my-4">Manage Staff</h1>
      <LinkButton
        to={`${previousPath}/add-new-staff`}
        label="Add New Staff Member"
      />
      <br />
      <br />
      <LinkButton
        to={`${previousPath}/search-staff`}
        label="Search Staff Members"
      />
    </div>
  );
};

export default ManageStaffPage;
