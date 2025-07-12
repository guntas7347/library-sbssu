import React from "react";
import LoginPermission from "./components/login-permission";

const AuthSettings = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-4xl font-semibold">Auth Settings</h2>
      <hr className="c-hr" />
      <LoginPermission />
      <hr className="c-hr" />
    </div>
  );
};

export default AuthSettings;
