import { Briefcase } from "lucide-react";
import InfoField from "../../../../forms/infoField/InfoField ";

const EmploymentDetails = ({ data }) => {
  if (!data) return null;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border p-8">
      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Briefcase className="w-6 h-6 mr-3 text-purple-600" />
        Employment Details
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoField label="Employee ID" value={data?.employeeId} />
        <InfoField label="ID Number" value={data?.idNumber} />
        <InfoField label="Department" value={data?.department} />
        <InfoField
          label="Designation"
          value={data?.designation}
          isCapitalized
        />
        <InfoField
          label="Joining Date"
          value={
            data?.joiningDate
              ? new Date(data.joiningDate).toLocaleDateString()
              : "N/A"
          }
        />
        <InfoField
          label="Employment Status"
          value={data?.employmentStatus}
          isCapitalized
        />
      </div>
    </div>
  );
};

export default EmploymentDetails;
