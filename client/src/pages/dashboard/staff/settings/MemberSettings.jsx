import React from "react";
import SimpleHeader from "../../../../components/header/SimpleHeader";
import MemberTypes from "../../../../components/features/dashboard/staff/settings/members/MemberTypes";

const MembersSettings = () => {
  return (
    <>
      <div className="space-y-5">
        <SimpleHeader
          title="Member Settings"
          sub="Configure issue durations, permissions, and compatibility"
        />
        <MemberTypes />
      </div>
    </>
  );
};

export default MembersSettings;
