import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import {
  resetPasswordAdmin,
  resetPasswordAdminSendOtp,
  resetPasswordAdminVerifyOtp,
} from "../http-requests";
import { useContext, useState } from "react";
import { SnackBarContext } from "../../components/context/snackbar.context";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const { formFields, handleChange } = useForm({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
    id: "",
  });

  const handleSendOtp = async () => {
    await resetPasswordAdminSendOtp(formFields.email)
      .then(({ message }) => {
        setFeedback([1, 1, message]);
        setShowOtpField(true);
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  const handleVerifyOtp = async () => {
    await resetPasswordAdminVerifyOtp({
      email: formFields.email,
      otp: formFields.otp,
    })
      .then((res) => {
        console.log(res);
        setFeedback([1, 1, res.message]);
        setShowPasswordField(true);
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  const handleUpdatePassword = async () => {
    if (formFields.newPassword !== formFields.confirmNewPassword) {
      setFeedback([1, 2, "Passwords must match"]);
      return;
    }

    await resetPasswordAdmin({
      email: formFields.email,
      otp: formFields.otp,
      newPassword: formFields.newPassword,
    })
      .then((res) => {
        setFeedback([1, 1, res.message]);
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
            className="border h-12 px-2.5"
            placeholder="Email Address"
            name="email"
            type="email"
            onChange={handleChange}
          />
          {showOtpField && (
            <>
              <input
                className="border h-12 px-2.5"
                placeholder="One Time Password"
                name="otp"
                type="number"
                onChange={handleChange}
              />
              {showPasswordField && (
                <>
                  <input
                    className="border h-12 px-2.5"
                    name="newPassword"
                    placeholder="Password"
                    type="password"
                    onChange={handleChange}
                  />
                  <input
                    className="border h-12 px-2.5"
                    name="confirmNewPassword"
                    placeholder="Confirm Password"
                    type="password"
                    onChange={handleChange}
                  />
                </>
              )}
            </>
          )}

          {showOtpField ? (
            <>
              {showPasswordField ? (
                <button className="my-button" onClick={handleUpdatePassword}>
                  Update Password
                </button>
              ) : (
                <button className="my-button" onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              )}
            </>
          ) : (
            <button className="my-button" onClick={handleSendOtp}>
              Send OTP
            </button>
          )}
        </div>
        <div className="flex flex-row w-full justify-center">
          <div>
            <Link to={"/"}>Login with credentials</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
