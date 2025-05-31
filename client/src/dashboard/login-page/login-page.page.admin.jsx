import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import { adminLoginWithCredentials, clearSession } from "../http-requests";

import { useFeedback } from "../../components/context/snackbar.context";
import Input from "../../components/forms/input";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const setFeedback = useFeedback();

  const { formFields, handleChange, setFields } = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await adminLoginWithCredentials(formFields);
      navigate("/admin/dashboard");
    } catch (error) {
      setFeedback(2, error.m);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await clearSession();
      } catch (error) {
        setFeedback(2, error.m);
      }
    })();
  }, []);

  return (
    <div className="h-screen flex flex-row justify-center py-2">
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
        <p className="text-xl font-bold">STAFF LOGIN</p>

        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Input
            label="Email Address"
            name="email"
            type="email"
            onChange={handleChange}
            required={true}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            required={true}
          />
          <Input
            label="TOTP"
            name="totp"
            type="text"
            onChange={(e) => {
              setFields("totp", e.target.value.replace(/\D/g, "").slice(0, 6));
            }}
            required={true}
            value={formFields.totp}
          />

          {/* <div className="flex justify-center">
            <ReCaptcha onChange={handleVerify} />
          </div> */}
          <button
            // disabled={!reCaptchaVerified}
            className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <div className="flex  w-full justify-center">
          <div>
            <Link to={"/admin/forgot-password"}>Forgot password</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
