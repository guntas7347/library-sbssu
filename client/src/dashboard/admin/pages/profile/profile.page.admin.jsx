import LinkButton from "../../../../components/forms/link-button/link-button.component";

const ProfilePage = () => {
  const previousPath = "/dashboard/admin/profile";
  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-5">Manage Profile</h1>
      <div className="grid grid-cols-1 gap-5 place-items-center">
        <LinkButton
          to={`${previousPath}/change-password`}
          label="Change Password"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
