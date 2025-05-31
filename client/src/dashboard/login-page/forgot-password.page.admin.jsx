import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import { resetPasswordAdminDispatchLink } from "../http-requests";
import { useFeedback } from "../../components/context/snackbar.context";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/forms/input";

const AdminForgotPassword = () => {
  const navigate = useNavigate();

  const setFeedback = useFeedback();

  const { formFields, handleChange } = useForm({
    email: "",
    url: `${window.location.protocol}//${window.location.hostname}`,
  });

  const handleReset = async () => {
    try {
      const res = await resetPasswordAdminDispatchLink(formFields);
      setFeedback(1, res.m);
      navigate("/admin");
    } catch (error) {
      setFeedback(2, error.m);
    }
  };

  return (
    <div className="h-screen flex flex-row justify-center items-center">
      <div className="c-box min-h-96 flex flex-col gap-5">
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
        <p className="text-xl font-bold">Forget password</p>

        <div className="flex flex-col gap-5">
          <Input
            label="Email Address"
            name="email"
            type="email"
            onChange={handleChange}
          />

          {/* <div className="flex justify-center">
          <ReCaptcha onChange={handleVerify} />
        </div> */}
          <button
            // disabled={!reCaptchaVerified}
            className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleReset}
          >
            Send reset link
          </button>
        </div>
        <div className="flex  w-full justify-center">
          <div>
            <Link to={"/admin"}>Login with credentials</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
