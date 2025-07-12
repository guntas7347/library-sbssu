import React from "react";
import IssueDuration from "./components/issue-duration";
import IssuePermission from "./components/issue-permission";
import IssueCompatibility from "./components/issue-compatibility";

const IssueSettings = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-4xl font-semibold">Issue Settings</h2>
      <hr className="c-hr" />
      <IssueDuration />
      <hr className="c-hr" />
      <IssuePermission />
      <hr className="c-hr" />
      <IssueCompatibility />
    </div>
  );
};

export default IssueSettings;
