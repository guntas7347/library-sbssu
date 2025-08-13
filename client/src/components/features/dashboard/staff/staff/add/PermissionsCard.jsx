import { ShieldCheck } from "lucide-react";
import { fromSnakeCase } from "../../../../../../utils/functions";

const ALL_PERMISSIONS = [
  // Highest Level
  "admin",

  // Circulation Management
  "issue_books",
  "return_books",
  "manage_fines",

  // Member Management
  "view_members",
  "view_applicants",
  "approve_applications",
  "edit_members",
  "allot_cards",
  "manage_card_status",
  "issue_no_due",

  // Catalog (Book) Management
  "view_books",
  "create_books",
  "edit_books",
  "delete_books",

  // Staff Management
  // admin only

  // System Administration
  "access_settings",
  "view_reports",
];

const PermissionsCard = ({ formFields, setFields }) => {
  const currentRights = formFields?.rights || [];

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    let updatedRights;
    if (checked) {
      updatedRights = [...currentRights, value];
    } else {
      updatedRights = currentRights.filter((right) => right !== value);
    }
    setFields({ rights: updatedRights });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
        System Permissions
      </h3>
      <div className="space-y-3">
        {ALL_PERMISSIONS.map((permission) => (
          <label
            key={permission}
            className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <input
              type="checkbox"
              value={permission}
              checked={currentRights.includes(permission)}
              onChange={handlePermissionChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-800 dark:text-gray-200 font-medium capitalize">
              {fromSnakeCase(permission)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PermissionsCard;
