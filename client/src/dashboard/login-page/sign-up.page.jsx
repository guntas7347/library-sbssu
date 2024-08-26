// import InputField from "../../components/forms/input-field/input-field.component";
import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import {
  compleateSignUpWithCredentials,
  createAuthApplicant,
  initalizeSignUpWithCredentials,
} from "../http-requests";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SnackBarContext } from "../../components/context/snackbar.context";

const InputField = (props) => {
  const { label } = props;
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input className=" border border-black px-1" {...props} />
    </div>
  );
};

const SignUpPage = () => {
  const navigate = useNavigate();

  const { setFeedback } = useContext(SnackBarContext);

  const { formFields, handleChange } = useForm({
    displayName: "",
    email: "",
  });

  const { displayName, email } = formFields;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAuthApplicant(formFields)
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
          <p className="text-xl font-bold">Create Student Account</p>
        </div>
        <form
          action=""
          className="flex flex-col gap-5 min-w-64"
          onSubmit={handleSubmit}
        >
          <InputField
            label="Full Name"
            name="displayName"
            value={displayName}
            onChange={handleChange}
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />

          <button className="my-button" type="submit">
            Create Account
          </button>
        </form>

        <Link to="/">Already have an account? Login In</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
