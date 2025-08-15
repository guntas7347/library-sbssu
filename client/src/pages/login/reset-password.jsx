import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/feedback/spinner/Spinner";
import { useForm } from "../../hooks/useForm";
import { useCountdown } from "../../hooks/useCountdown";
import useQuery from "../../hooks/useQuery";
import useFeedback from "../../hooks/useFeedback";
import NotFoundPage from "../../components/404/404";
import TwoFactorSetup from "./qrcode.component";
import Input from "../../components/forms/input/Input-2";
import ProgressBar from "../../components/feedback/progress-bar/progress-bar.component";
import server from "../../services/server.api";
import Header from "../../components/header/Header";
import LoginCard from "../../components/features/login/LoginCard";
import TotpInput from "../../components/forms/input/Totp";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const setFeedback = useFeedback();
  const [data, setData] = useState("");
  const { params } = useQuery();
  const { token } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [validLink, setValidLink] = useState(true);
  const [expiryTime, setExpiryTime] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const { formFields, handleChange, setFields } = useForm();
  const { isExpired, timeLeft } = useCountdown(expiryTime);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.auth.verifyLink({ code: token });
        setData(res.data);
        const resetCodeTime = new Date(res.data.resetCodeTime).getTime();
        const expiry = new Date(resetCodeTime + 1000 * 60 * 15);
        setExpiryTime(expiry);
        setIsLoading(false);
      } catch (error) {
        setFeedback(2, error);
        setIsLoading(false);
        setValidLink(false);
      }
    })();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formFields.password !== formFields.confirmPassword) {
      setFeedback(2, "Passwords must match");
      return;
    }

    try {
      const res = await server.auth.resetPassword({
        ...formFields,
        code: token,
      });
      setFeedback(1, res);
      navigate("/login");
    } catch (error) {
      setFeedback(2, error);
    }
  };

  if (isLoading)
    return (
      <>
        <div className="flex justify-center h-96 items-center">
          <Spinner />
        </div>
      </>
    );

  function convertSeconds(seconds) {
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${mins} minutes and ${secs}`;
  }

  return (
    <>
      <Header />
      {validLink ? (
        <>
          <LoginCard
            title="Reset Password"
            subTitle="Enter your credentials to access the library portal"
          >
            {" "}
            <form
              className="flex flex-col gap-5"
              onSubmit={handleChangePassword}
              autoComplete="off"
            >
              <div>
                <p>
                  {timeLeft === 0 ? (
                    <span className="text-red-600">Link expired!</span>
                  ) : (
                    <span>
                      Link expires in {convertSeconds(timeLeft)} seconds
                    </span>
                  )}
                </p>

                <ProgressBar
                  value={Math.round((timeLeft / (60 * 15)) * 100)}
                  reverse={true}
                  color={timeLeft < 120 ? "red" : "blue"}
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
              <Input
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type="password"
                maxLength="16"
                onChange={handleChange}
                required={true}
              />
              <div className="flexs gap-5 items-center">
                <div className="flex flex-col gap-3 max-w-1/2">
                  <TwoFactorSetup
                    secret={data.base32}
                    otpauthUrl={data.otpauth_url}
                  />
                </div>
                <TotpInput onChange={(e) => setFields({ totp: e })} />
              </div>
              <button
                type="submit"
                disabled={isExpired}
                className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-red-600 "
              >
                Confirm
              </button>
            </form>
          </LoginCard>
        </>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default ResetPasswordPage;
