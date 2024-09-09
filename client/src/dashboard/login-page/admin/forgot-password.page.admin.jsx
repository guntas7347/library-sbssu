import { useForm } from "../../../components/forms/use-form-hook/use-form.hook.component";
import {
  resetPasswordAdmin,
  resetPasswordAdminDispatchLink,
  resetPasswordAdminSendOtp,
  resetPasswordAdminVerifyOtp,
} from "../../http-requests";
import { useContext, useState } from "react";
import { SnackBarContext } from "../../../components/context/snackbar.context";
import { Link, useNavigate } from "react-router-dom";

const AdminForgotPassword = () => {
  const navigate = useNavigate();

  const { setFeedback } = useContext(SnackBarContext);

  const { formFields, handleChange } = useForm({
    email: "",
  });

  const handleReset = async () => {
    await resetPasswordAdminDispatchLink(formFields.email)
      .then((res) => {
        setFeedback([1, 1, res.message]);
        navigate("/");
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  return (
    <div className="h-screen flex flex-row justify-center items-center">
      <div className="bg-white p-10 flex flex-col items-center gap-6 justify-center">
        <div className="self-start flex flex-row items-center gap-5">
          <img
            className="h-10 inline-block"
            src="https://sbssu.ac.in/images/Tricolor.png"
            alt="sbssu logo"
          />
          <h1 className="text-3xl text-indigo-900 font-bold inline-block">
            SBSSU Library Portal
          </h1>
        </div>
        <div className="self-start">
          <p className="text-xl font-bold">Reset your password</p>
          <p>Enter you email</p>
        </div>
        <div className="grid gap-2 w-80">
          <input
            className="border border-black h-12 px-2.5"
            placeholder="Email Address"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>

        <button className="my-button" onClick={handleReset}>
          Send Reset Link
        </button>
        <div className="flex flex-col w-full gap-10 items-center justify-center">
          <div>
            <Link to={"/"}>Login with credentials</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
