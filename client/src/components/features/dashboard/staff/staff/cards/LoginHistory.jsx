import { Clock, Monitor } from "lucide-react";

const LoginHistory = ({ data }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-gray-600 dark:text-gray-400" />
            Recent Login History
          </h4>

          <div className="space-y-4">
            {data.rights.map((login, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {login.date} at {login.time}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {login.device} • {login.ipAddress}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {login.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginHistory;
