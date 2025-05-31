import React from "react";
import FineSettings from "./components/fine-settings";

const ReturnSettings = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-4xl font-semibold">Return Settings</h2>
      <hr className="c-hr" />
      <div>
        <FineSettings />
      </div>
    </div>
  );
};

export default ReturnSettings;
