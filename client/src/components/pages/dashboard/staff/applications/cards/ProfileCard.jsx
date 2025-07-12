import React from "react";
import { imagePathUrl } from "../../../../../../utils/functions";
import { Calendar, Clock, Mail, MapPin, Phone } from "lucide-react";
import { castTypeLabels } from "../../../../../../utils/selectLabels";

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
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-yellow-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {data.fullName}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
              {data.program}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
