import SimpleHeader from "../../../../components/header/SimpleHeader";
import IssueDurationCard from "../../../../components/features/dashboard/staff/settings/issue/IssueDurationCard";
import IssuePermissionCard from "../../../../components/features/dashboard/staff/settings/issue/IssuePermissionCard";
import IssueCompatibilityCard from "../../../../components/features/dashboard/staff/settings/issue/IssueCompatibilityCard";

const IssueSettings = () => {
  return (
    <>
      <div className="space-y-5">
        <SimpleHeader
          title="Issue Settings"
          sub="Configure issue durations, permissions, and compatibility"
        />
        <IssueDurationCard />
        <IssuePermissionCard />
        <IssueCompatibilityCard />
      </div>
    </>
  );
};

export default IssueSettings;
