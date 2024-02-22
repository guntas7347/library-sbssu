import LinkButton from "../../../../components/forms/link-button/link-button.component";

const ProfilePage = () => {
  const previousPath = "/dashboard/admin/profile";
  return (
    <div className="text-center">
      <h1 className="my-4">Manage Profile</h1>
      <LinkButton
        to={`${previousPath}/change-password`}
        label="Change Password"
      />
    </div>
  );
};

export default ProfilePage;
