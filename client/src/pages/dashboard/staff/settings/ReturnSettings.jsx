import SimpleHeader from "../../../../components/header/SimpleHeader";
import FineCard from "../../../../components/features/dashboard/staff/settings/return/FineCard";

const ReturnSettings = () => {
  return (
    <>
      <div className="space-y-5">
        <SimpleHeader
          title="Return Settings"
          sub="Configure issue durations, permissions, and compatibility"
        />
        <FineCard />
      </div>
    </>
  );
};

export default ReturnSettings;
