// import InputField from "../../components/forms/input-field/input-field.component";
import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import {
  compleateSignUpWithCredentials,
  initalizeSignUpWithCredentials,
} from "../http-requests";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { SnackBarContext } from "../../components/context/snackbar.context";

const InputField = (props) => {
  const { label } = props;
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input className="border px-1" {...props} />
    </div>
  );
};

const SignUpPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [showOTPForm, setShowOTPForm] = useState(false);

  const { formFields, handleChange, resetFormFields } = useForm({
    displayName: "",
    email: "",
    password: "",
    otp: "",
    _id: "",
  });

  const { displayName, email, password, otp } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!showOTPForm) {
      await initalizeSignUpWithCredentials(formFields)
        .then((res) => {
          handleChange({ target: { name: "_id", value: res.payload } });
          setFeedback([1, 1, res.message]);
          setShowOTPForm(true);
        })
        .catch((err) => setFeedback([1, 2, err]));
    } else {
      await compleateSignUpWithCredentials({
        otp: +formFields.otp,
        _id: formFields._id,
      })
        .then((res) => {
          setFeedback([1, 1, res.message]);
          setShowOTPForm(false);
          resetFormFields();
        })
        .catch((err) => setFeedback([1, 2, err]));
    }
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
          <p className="text-xl font-bold">Create Student Account</p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center gap-5 w-full">
            <InputField
              label="Full Name"
              name="displayName"
              value={displayName}
              onChange={handleChange}
              disabled={showOTPForm}
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              disabled={showOTPForm}
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handleChange}
              disabled={showOTPForm}
            />
            {showOTPForm && (
              <InputField
                name="otp"
                label="6 Digit One Time Password"
                type="number"
                value={otp}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 6);
                }}
              />
            )}
            {showOTPForm ? (
              <button className="my-button" type="submit">
                Create Account
              </button>
            ) : (
              <button className="my-button" type="submit">
                Send OTP
              </button>
            )}
          </div>
        </form>
        <Link to="/">Already have an account? Login In</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
