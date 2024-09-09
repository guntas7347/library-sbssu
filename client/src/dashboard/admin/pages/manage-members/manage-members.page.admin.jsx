import LinkButton from "../../../../components/forms/link-button/link-button.component";

const ManageStudentsPage = () => {
  const previousPath = "/dashboard/admin/manage-members";
  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-5">Manage Members</h1>
      <div className="grid grid-cols-1 gap-5 place-items-center">
        <LinkButton to={`${previousPath}/add-member`} label="Add new Member" />

        <LinkButton
          to={`${previousPath}/add-member/add-member-card`}
          label="Add Library Card"
        />

        <LinkButton
          to={`${previousPath}/approve-members`}
          label="Approve Members"
        />

        <LinkButton
          to={`${previousPath}/search-members`}
          label="Search Members"
        />
      </div>
    </div>
  );
};

export default ManageStudentsPage;
