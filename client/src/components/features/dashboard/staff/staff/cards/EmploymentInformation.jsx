import { User } from "lucide-react";

const EmploymentInformation = ({ data }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
            Employment Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Employee ID
              </label>
              <p className="text-gray-900 dark:text-white font-semibold">
                {data.employeeId}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Department
              </label>
              <p className="text-gray-900 dark:text-white font-semibold">
                {data.department}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Position
              </label>
              <p className="text-gray-900 dark:text-white font-semibold">
                {data.designation}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Role
              </label>
              <p className="text-gray-900 dark:text-white font-semibold">
                Admin
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Joining Date
              </label>
              <p className="text-gray-900 dark:text-white font-semibold">
                {data.joiningDate}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Status
              </label>
              <p className="text-gray-900 dark:text-white font-semibold">
                {data.employmentStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmploymentInformation;
