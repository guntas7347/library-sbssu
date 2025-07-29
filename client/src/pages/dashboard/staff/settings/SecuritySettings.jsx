import React from "react";
import SimpleHeader from "../../../../components/header/SimpleHeader";

const SecuritySettings = () => {
  return (
    <>
      <div className="space-y-5">
        <SimpleHeader
          title="Security Settings"
          sub="Configure issue durations, permissions, and compatibility"
        />
      </div>
    </>
  );
};

export default SecuritySettings;
