import React from "react";
import SimpleHeader from "../../../../components/header/SimpleHeader";
import CardTypes from "../../../../components/features/dashboard/staff/settings/libraryCard/CardTypes";
import AutoAllotCard from "../../../../components/features/dashboard/staff/settings/libraryCard/AutoAllotCard";

const LibraryCardSettings = () => {
  return (
    <>
      <div className="space-y-5">
        <SimpleHeader
          title="Library Card Settings"
          sub="Configure issue durations, permissions, and compatibility"
        />
        <CardTypes />
        <AutoAllotCard />
      </div>
    </>
  );
};

export default LibraryCardSettings;
