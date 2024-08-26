import { useContext } from "react";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { changePassword } from "../../../../http-requests";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const ChangePasswordPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const { formFields, handleChange, resetFormFields } = useForm({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { currentPassword, newPassword, confirmNewPassword } = formFields;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formFields);

    if (newPassword !== confirmNewPassword) {
      setFeedback({
        open: true,
        severity: "error",
        message: "New Password and Confirm New Password are not same",
      });
    } else {
      await changePassword(formFields)
        .then(({ message }) => {
          resetFormFields();
          setFeedback({
            open: true,
            severity: "success",
            message,
          });
        })
        .catch((err) => setFeedback([1, 2, err]));
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Change your password</h1>
      <div className="my-5 white-container">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-5">
            <InputField
              label="Current Password"
              name="currentPassword"
              type="password"
              onChange={handleChange}
              value={currentPassword}
            />

            <InputField
              label="New Password"
              name="newPassword"
              type="password"
              onChange={handleChange}
              value={newPassword}
            />

            <InputField
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              onChange={handleChange}
              value={confirmNewPassword}
            />
          </div>
          <button className="my-button my-5" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
