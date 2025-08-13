import { imagePathUrl } from "../../../../../../utils/functions";
import { User } from "lucide-react";

const MemberInfo = ({ data }) => {
  if (!data) return null; // Don't render if there's no member data

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          Member Information
        </h4>
        <div className="flex items-center space-x-4">
          <img
            src={imagePathUrl(data?.photo)}
            alt={data?.fullName ?? "Member"}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
          <div>
            <h5 className="font-semibold text-gray-900 dark:text-white">
              {data?.fullName ?? "Unknown Member"}
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ID: {data?.membershipId ?? "N/A"}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 capitalize">
              {data?.program ?? ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
