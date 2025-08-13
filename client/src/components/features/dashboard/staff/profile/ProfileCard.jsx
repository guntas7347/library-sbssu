import { CheckCircle } from "lucide-react";
import { fromSnakeCase, imagePathUrl } from "../../../../../utils/functions";

const ProfileCard = ({ data }) => {
  if (!data) return null;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border p-8 text-center">
      <div className="relative inline-block mb-6">
        <img
          src={imagePathUrl(data?.photo)}
          alt={data?.fullName ?? "Staff"}
          className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
        />
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {data?.fullName ?? "N/A"}
      </h3>
      <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
        {fromSnakeCase(data?.designation) ?? "N/A"}
      </p>
      <div className="grid grid-cols-2 gap-4 text-center pt-6 border-t">
        <div>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {data?.stats?.booksIssued ?? 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Books Issued
          </p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {data?.stats?.membersApproved ?? 0}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Members Approved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
