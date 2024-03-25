import LinkButton from "../../../../components/forms/link-button/link-button.component";

const ManageStaffPage = () => {
  const previousPath = "/dashboard/admin/manage-staff";
  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-5">Manage Staff</h1>
      <div className="grid grid-cols-1 gap-5 place-items-center">
        <LinkButton
          to={`${previousPath}/add-new-staff`}
          label="Add New Staff Member"
        />

        <LinkButton
          to={`${previousPath}/search-staff`}
          label="Search Staff Members"
        />
      </div>
    </div>
  );
};

export default ManageStaffPage;
