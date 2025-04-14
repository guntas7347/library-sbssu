import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/feedback/spinner/spinner.component";
import {
  resetPasswordAdmin,
  resetPasswordAdminVerifyLink,
} from "../http-requests";
import { SnackBarContext } from "../../components/context/snackbar.context";
import Page404 from "../../components/404/404";
import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const { setFeedback } = useContext(SnackBarContext);

  const url = useLocation().pathname.split("/");
  const code = url[2];

  const [isLoading, setIsLoading] = useState(true);
  const [validLink, setValidLink] = useState(true);

  const { formFields, handleChange } = useForm({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const asyncFunc = async () => {
      await resetPasswordAdminVerifyLink("admin", code)
        .then((res) => {
          setFeedback([1, 1, res.message]);
          setIsLoading(false);
        })
        .catch((err) => {
          setFeedback([1, 2, err]);
          setIsLoading(false);
          setValidLink(false);
        });
    };

    asyncFunc();
  }, []);

  const handleChangePassword = async () => {
    if (formFields.password !== formFields.confirmPassword) {
      setFeedback([1, 2, "Passwords must match"]);
      return;
    }
    await resetPasswordAdmin(formFields.password, code)
      .then((res) => {
        setFeedback([1, 1, res.message]);
        navigate("/");
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
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
            </div>
            <div className="grid gap-2 w-80">
              <label htmlFor="">Password</label>
              <input
                className="border border-black h-12 px-2.5"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2 w-80">
              <label htmlFor="">Confirm Password</label>
              <input
                className="border border-black h-12 px-2.5"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
              />
            </div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleChangePassword}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <Page404 />
      )}
    </>
  );
};

export default ResetPasswordPage;
