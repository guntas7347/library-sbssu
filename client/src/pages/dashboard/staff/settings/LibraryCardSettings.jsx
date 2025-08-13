import SimpleHeader from "../../../../components/header/SimpleHeader";
import CardTypes from "../../../../components/features/dashboard/staff/settings/libraryCard/CardTypes";

const LibraryCardSettings = () => {
  return (
    <>
      <div className="space-y-5">
        <SimpleHeader
          title="Library Card Settings"
          sub="Configure issue durations, permissions, and compatibility"
        />
        <CardTypes />
      </div>
    </>
  );
};

export default LibraryCardSettings;
