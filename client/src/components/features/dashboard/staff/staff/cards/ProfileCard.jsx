import {
  Calendar,
  Mail,
  Phone,
  Shield as ShieldIcon,
  User as UserIcon,
} from "lucide-react";
import { imagePathUrl, fromSnakeCase } from "../../../../../../utils/functions";

const ProfileCard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8 text-center">
          <div className="relative inline-block mb-6">
            <img
              src={imagePathUrl(data?.photo)}
              alt={data?.fullName ?? "Staff"}
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/128x128/cccccc/333333?text=N/A";
              }}
            />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
              <ShieldIcon className="w-5 h-5 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {data?.fullName ?? "N/A"}
          </h3>
          <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4 capitalize">
            {fromSnakeCase(data?.designation) ?? "N/A"}
          </p>
          <div className="space-y-3 text-left pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {data?.email ?? "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {data?.phoneNumber ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
