import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { getFingerprint } from "../../utils/fingerprint";
import server from "../../services/server.api";
import useFeedback from "../../hooks/useFeedback";
import Input from "../../components/forms/input/input-2";
import { Eye, EyeOff } from "lucide-react";
import TotpInput from "../../components/forms/input/Totp";
import LoginCard from "../../components/pages/login/LoginCard";

const LoginPage = () => {
  const navigate = useNavigate();
  const setFeedback = useFeedback();

  const [showPassword, setShowPassword] = useState(false);

  const { formFields, handleChange, setFields } = useForm();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const fingerprint = getFingerprint();
      const res = await server.auth.login({
        ...formFields,
        fingerprint,
      });

      if (res.data === "STAFF") return navigate("/staff/dashboard");
      if (res.data === "MEMBER") return navigate("/member/dashboard");
      const err = new Error();
      err.message = "Login failed, Contact library.";
      throw err;
    } catch (error) {
      console.log(error.message);
      setFeedback(2, error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await server.auth.clearSession();
      } catch (error) {
        console.log(error);
        setFeedback(2, error);
      }
    })();
  }, []);

  return (
    <>
      <LoginCard
        title="Sign In"
        subTitle="Enter your credentials to access the library portal"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <Input
              label="Username"
              name="username"
              placeholder="MEM-25-0**"
              onChange={handleChange}
              maxLength="10"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="relative">
              <Input
                label="Passowrd"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={handleChange}
                maxLength="16"
                required
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2/3 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <TotpInput onChange={(e) => setFields({ totp: e })} />
          <div className="space-y-4 pt-4 flex flex-col">
            <button className="c-btn-blue">Sign In</button>
            <Link
              className="text-center px-5 py-1.5 me-2 border border-gray-700 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white"
              to="/login/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </LoginCard>
    </>
  );
};

export default LoginPage;
