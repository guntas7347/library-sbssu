import React from "react";
import { Shield } from "lucide-react";

import CardHeader from "../../../../../header/CardHeader";
import SelectToggle from "../../../../../forms/toggle/SelectToggle";
import useSetting from "../../../../../../hooks/useSetting";
import Spinner from "../../../../../feedback/spinner/Spinner";
import { fromSnakeCase } from "../../../../../../utils/functions";
import SaveCancelButton from "../../../../../buttons/SaveCancelButton";

const IssuePermissionCard = () => {
  // Fetch the list of member types to display
  const { data: memberTypes, loading: memberTypesLoading } = useSetting(
    "MEMBER-TYPES",
    []
  );

  // This is now the SINGLE SOURCE OF TRUTH for the permissions
  const {
    data: permissions,
    setData: setPermissions,
    loading: permissionsLoading,
    handleSave,
  } = useSetting("ISSUE-PERMISSION", {});

  // A single, clean handler to update the permissions state
  const handleToggle = (memberType, isEnabled) => {
    setPermissions((currentPermissions) => ({
      ...currentPermissions,
      [memberType]: isEnabled,
    }));
  };

  if (memberTypesLoading || permissionsLoading) return <Spinner solo />;

  return (
    <div className="card p-6">
      <CardHeader
        title="Issue Permission"
        svg={Shield}
        svgClass="bg-green-100 text-green-600"
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-3">
        {memberTypes.map((item) => (
          <SelectToggle
            key={item}
            label={fromSnakeCase(item, 1)}
            // The onToggle now calls our clean handler
            onToggle={(isEnabled) => handleToggle(item, isEnabled)}
            // The 'checked' prop directly reads from our single state
            checked={permissions?.[item] || false}
          />
        ))}
      </div>
      <SaveCancelButton
        // The onSave function now correctly uses the up-to-date state
        onSave={handleSave}
      />
    </div>
  );
};

export default IssuePermissionCard;
