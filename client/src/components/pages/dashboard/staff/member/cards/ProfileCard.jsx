import { Calendar, CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { imagePathUrl } from "../../../../../../utils/functions";
import {
  castTypeLabels,
  memberTypeLabels,
} from "../../../../../../utils/selectLabels";

const ProfileCard = ({ data }) => {
  return (
    <>
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8 text-center">
            <div className="relative inline-block mb-6">
              <img
                src={imagePathUrl(data.imageUrl)}
                alt={data.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {data.fullName}
            </h3>
            <p className="text-green-600 dark:text-green-400 font-semibold mb-4">
              {memberTypeLabels[data.memberType]} Member
            </p>

            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  {data.email}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  {data.phoneNumber}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  {new Date(data.dob).toDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  {data.streetAddress}, {data.city}
                </span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Cast</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {castTypeLabels[data.category]}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500 dark:text-gray-400">
                  Father's Name
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {data.fatherName}
                </span>
              </div>
            </div>
            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    2
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Current Books
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    24
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Books Returned
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">
            Financial Summary
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Total Fines
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ₹430
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Paid</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                ₹200
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
              <span className="text-gray-600 dark:text-gray-400">
                Outstanding
              </span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                ₹230
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
