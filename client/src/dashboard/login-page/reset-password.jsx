import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/feedback/spinner/spinner.component";
import {
  resetPasswordAdmin,
  resetPasswordAdminVerifyLink,
} from "../http-requests";
import { useFeedback } from "../../components/context/snackbar.context";
import Page404 from "../../components/404/404";
import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import Input from "../../components/forms/input";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const setFeedback = useFeedback();

  const url = useLocation().pathname.split("/");
  const code = url[3];

  const [isLoading, setIsLoading] = useState(true);
  const [validLink, setValidLink] = useState(true);
  const [qrData, setQrData] = useState("");

  const { formFields, handleChange } = useForm();

  useEffect(() => {
    const asyncFunc = async () => {
      await resetPasswordAdminVerifyLink("admin", code)
        .then((res) => {
          setFeedback([1, 1, res.message]);
          setQrData(res.payload);
          setIsLoading(false);
        })
        .catch((error) => {
          setFeedback([1, 2, error]);
          setIsLoading(false);
          setValidLink(false);
        });
    };

    asyncFunc();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formFields.password !== formFields.confirmPassword) {
      setFeedback([1, 2, "Passwords must match"]);
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(formFields.password)) {
      setFeedback([
        1,
        2,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      ]);
      return;
    }

    try {
      const res = await resetPasswordAdmin(
        formFields.password,
        formFields.totp,
        code
      );
      setFeedback([1, 1, res.message]);
      navigate("/admin");
    } catch (error) {
      setFeedback([1, 2, error]);
    }
  };

  if (isLoading)
    return (
      <>
        <div className="flex justify-center h-96 items-center">
          <Spinner />
        </div>
      </>
    );

  return (
    <>
      {validLink ? (
        <div className="min-h-screen my-5 flex flex-row justify-center items-center">
          <div className="c-box flex flex-col gap-5">
            <div className="self-start flex flex-row items-center gap-5">
              <img
                className="h-10 inline-block"
                src="/sbssu-logo.png"
                alt="sbssu logo"
              />
              <h1 className="text-3xl text-indigo-900 dark:text-indigo-100 font-bold inline-block">
                SBSSU Library Portal
              </h1>
            </div>
            <p className="text-xl font-bold">Reset Password</p>
            <form
              className="flex flex-col gap-5"
              onSubmit={handleChangePassword}
              autoComplete="off"
            >
              <Input
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                required={true}
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                required={true}
              />
              <div className="flex gap-5 items-center">
                <div className="flex flex-col gap-3">
                  <h3 className="max-w-56">
                    Scan below QR with Authenticator app and enter the code
                  </h3>
                  <img src={qrData} alt="auth-qr" />
                </div>
                <Input
                  label="Code"
                  name="totp"
                  type="number"
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <button
                type="submit"
                className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Page404 />
      )}
    </>
  );
};

export default ResetPasswordPage;
