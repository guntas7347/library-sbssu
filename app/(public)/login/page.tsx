"use client";

import React, { useEffect, useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { loginKoha } from "@/lib/koha/kohaSession";
import { useRouter } from "next/navigation";
import { validateKohaSession } from "@/lib/koha/kohaFetch";

const LoginPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { formFields, handleChange } = useForm({
    username: "",
    password: "",
  });

  useEffect(() => {
    const validate = async () => {
      const isValid = await validateKohaSession();

      if (isValid) router.push("/dashboard");
    };

    validate();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await loginKoha(formFields.username, formFields.password);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed");
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        {/* Clean, standalone card wrapper */}
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 sm:p-10">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <LogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sign In
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Enter your credentials to access the library portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                required
                value={formFields.username}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/* Password Input with Show/Hide Toggle */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  maxLength="16"
                  value={formFields.password}
                  onChange={handleChange}
                  className="form-input pr-12" /* Extra right padding so text doesn't hide behind the icon */
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button type="submit" className="btn-primary w-full">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
