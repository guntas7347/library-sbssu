import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import {
  adminLoginWithCredentials,
  signOut,
  verifyReCaptcha,
} from "../http-requests";

import { SnackBarContext } from "../../components/context/snackbar.context";
import ReCaptcha from "../../components/feedback/recaptcha/recaptcha.component";
import Input from "../../components/forms/input";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { setFeedback } = useContext(SnackBarContext);

  const [reCaptchaVerified, setReCaptchaVerified] = useState(false);

  const { formFields, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await adminLoginWithCredentials(formFields)
      .then(() => {
        navigate("/admin/dashboard");
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await signOut().catch((err) => {
        setFeedback([1, 2, err]);
      });
    };
    asyncFunc();
  }, []);

  const handleVerify = async (token) => {
    await verifyReCaptcha(token)
      .then((res) => setReCaptchaVerified(res.payload.success))
      .catch((err) => setFeedback(err));
  };

  return (
    <div className="h-screen flex flex-row justify-center items-center">
      <div className="c-box flex flex-col gap-5">
        <div className="self-start flex flex-row items-center gap-5">
          <img
            className="h-10 inline-block"
            src="https://sbssu.ac.in/images/Tricolor.png"
            alt="sbssu logo"
          />
          <h1 className="text-3xl text-indigo-900 dark:text-indigo-100 font-bold inline-block">
            SBSSU Library Portal
          </h1>
        </div>
        <p className="text-xl font-bold">STAFF LOGIN</p>

        <div className="flex flex-col gap-2">
          <Input
            label="Email Address"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />

          {/* <div className="flex justify-center">
            <ReCaptcha onChange={handleVerify} />
          </div> */}
          <button
            // disabled={!reCaptchaVerified}
            className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>
        <div className="flex  w-full justify-center">
          <div>
            <Link to={"/forgot-password"}>Forgot password</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
