import { Clock } from "lucide-react";
import React from "react";

const Reservations = ({ data = { reservations: [{}] } }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-yellow-600 dark:text-yellow-400" />
            Reservations ({data.reservations.length})
          </h4>

          <div className="space-y-4">
            {data.reservations.map((reservation, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {reservation.member}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {reservation.memberId} • Reserved:{" "}
                      {reservation.reservedDate}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 rounded-full text-xs font-medium">
                  Priority #{reservation.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservations;
