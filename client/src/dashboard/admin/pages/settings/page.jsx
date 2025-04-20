import React from "react";
import Sidebar from "./sidebar";
import SettingsRoutes from "../../routes/settings.router";

const SettingsPage = () => {
  return (
    <div className="px-10">
      <h1 className="text-3xl font-semibold my-5">Settings Page</h1>
      <div className="c-box flex gap-15 min-h-screen">
        <div className="basis-1/6">
          <Sidebar />
        </div>
        <div className="basis-5/6">
          <SettingsRoutes />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
