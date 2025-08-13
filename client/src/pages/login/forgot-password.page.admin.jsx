import { Link, useNavigate } from "react-router-dom";
import useFeedback from "../../hooks/useFeedback";
import server from "../../services/server.api";
import Input from "../../components/forms/input/Input-2";
import { useForm } from "../../hooks/useForm";
import LoginCard from "../../components/features/login/LoginCard";
import { URL_PATH } from "../../utils/keys";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const setFeedback = useFeedback();

  const { formFields, handleChange } = useForm({
    url: `${URL_PATH}/reset-password?token=`,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await server.auth.forgotPassword(formFields);
      setFeedback(1, res);
      navigate("/login");
    } catch (error) {
      setFeedback(2, error);
    }
  };

  return (
    <>
      <LoginCard
        title="Forgot Password"
        subTitle="Enter your username to request password reset link via email"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="flex flex-col gap-2">
            <Input
              label="Username"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              maxLength="11"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="space-y-4 pt-4 flex flex-col">
            <button className="c-btn-blue">Send reset link</button>
            <Link
              className="text-center px-5 py-1.5 me-2 border border-gray-700 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white"
              to="/login"
            >
              Login
            </Link>
          </div>
        </form>
      </LoginCard>
    </>
  );
};

export default ForgotPassword;
