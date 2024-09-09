import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "../../../components/forms/use-form-hook/use-form.hook.component";
import {
  adminLoginWithCredentials,
  signOut,
  verifyReCaptcha,
} from "../../http-requests";

import { SnackBarContext } from "../../../components/context/snackbar.context";
import ReCaptcha from "../../../components/feedback/recaptcha/recaptcha.component";

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
        navigate("/dashboard/admin");
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
          <p className="text-xl font-bold">STAFF LOGIN</p>
          <p>Sign-in to continue</p>
        </div>
        <div className="grid gap-2 w-80">
          <input
            className="border border-black h-12 px-2.5"
            placeholder="Email Address"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <input
            className="border border-black h-12 px-2.5"
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <ReCaptcha onChange={handleVerify} />
          </div>
          <button
            // disabled={!reCaptchaVerified}
            className="my-button"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>
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
