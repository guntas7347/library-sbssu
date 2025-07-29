import React from "react";
import HelpSection from "../public/footer/HelpSection";

const LoginCard = ({ title, subTitle, children }) => {
  return (
    <>
      {" "}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-all duration-300">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md mx-auto">
            <div className="c-card">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-2">
                    {title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {subTitle}{" "}
                  </p>
                </div>
                {children}
              </div>
            </div>
            <HelpSection />
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginCard;
