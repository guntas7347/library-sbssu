import React from "react";
import {
  calculateAge,
  fromSnakeCase,
  imagePathUrl,
} from "../../../../../../utils/functions";
import { Calendar, Clock, Mail, MapPin, Phone } from "lucide-react";

/**
 * A safe component to display an applicant's profile information.
 * It uses optional chaining and provides fallbacks for all data points.
 * @param {{ data: object }} props
 */
const ProfileCard = ({ data }) => {
  // Return null if no data is provided to prevent crashes
  if (!data) {
    return null;
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8 text-center">
          <div className="relative inline-block mb-6">
            <img
              src={imagePathUrl(data?.photo)}
              alt={data?.fullName ?? "Applicant"}
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/128x128/cccccc/333333?text=N/A";
              }}
            />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {data?.fullName ?? "Applicant Name N/A"}
          </h3>
          <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
            {fromSnakeCase(data?.program) ?? "N/A"}{" "}
            {fromSnakeCase(data?.specialization) ?? ""}
          </p>

          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {data?.email ?? "No email provided"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {data?.phoneNumber ?? "No phone provided"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {data?.dob
                  ? `${new Date(data.dob).toDateString()} (${calculateAge(
                      data.dob
                    )} years)`
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {data?.streetAddress ?? "N/A"}, {data?.city ?? "N/A"}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Caste</span>
              <span className="font-medium text-gray-900 dark:text-white capitalize">
                {fromSnakeCase(data?.cast) ?? "N/A"}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500 dark:text-gray-400">
                Father's Name
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {data?.fatherName ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
