import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import "./login-page.styles.scss";

import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import {
  adminLoginWithCredentials,
  applicantLoginWithCredentials,
  signOut,
  studentLoginWithCredentials,
  verifyReCaptcha,
} from "../http-requests";

import InputSelect from "../../components/forms/input-select/input-select.component";
import { SnackBarContext } from "../../components/context/snackbar.context";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setFeedback } = useContext(SnackBarContext);

  const [loginType, setLoginType] = useState("ADMIN");

  const [reCaptchaVerified, setReCaptchaVerified] = useState(false);

  const { formFields, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    switch (loginType) {
      case "ADMIN":
        await adminLoginWithCredentials(formFields)
          .then((res) => {
            if (res.payload === "ADMIN") navigate("/dashboard/admin");
            if (res.payload === "STAFF") navigate("/dashboard/staff");
          })
          .catch((err) => setFeedback([1, 2, err]));
        break;

      case "STUDENT":
        await studentLoginWithCredentials(formFields)
          .then(() => {
            navigate("/dashboard/student");
          })
          .catch((err) => setFeedback([1, 2, err]));
        break;

      case "APPLICANT":
        await applicantLoginWithCredentials(formFields)
          .then(() => {
            navigate("/dashboard/applicant");
          })
          .catch((err) => setFeedback([1, 2, err]));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await signOut().catch((err) => console.log(err));
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
          <p className="text-xl font-bold">Hello! Lets get started</p>
          <p>Sign-in to continue</p>
        </div>
        <div className="grid gap-2 w-80">
          <input
            className="border h-12 px-2.5"
            placeholder="Email Address"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <input
            className="border h-12 px-2.5"
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LczFYgpAAAAALk-4XyUrx0bRXOXoWLK9phbwe1O"
              onChange={handleVerify}
            />
          </div>
          <button
            disabled={!reCaptchaVerified}
            className="my-button"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>{" "}
        <div className="flex flex-row w-full justify-between">
          <div>
            <Link to={"/forgot-password"}>Forgot password</Link>
          </div>
          <div>
            <Link to={"/sign-up"}>Create Account</Link>
          </div>
        </div>
        <div>
          <InputSelect
            name="Login Type"
            fields={[
              { name: "Student", value: "STUDENT" },
              { name: "Admin", value: "ADMIN" },
              { name: "Applicant", value: "APPLICANT" },
            ]}
            value={loginType}
            onChange={(e) => setLoginType(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
