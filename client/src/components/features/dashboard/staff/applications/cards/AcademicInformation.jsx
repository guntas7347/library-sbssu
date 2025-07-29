import { GraduationCap } from "lucide-react";
import React from "react";
import InfoField from "../../../../../forms/infoField/InfoField ";
import { fromSnakeCase } from "../../../../../../utils/functions";

/**
 * A safe component to display an applicant's academic information.
 * @param {{ data: object }} props
 */
const AcademicInformation = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="p-8">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <GraduationCap className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
          Academic Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoField label="Roll Number" value={data?.rollNumber ?? "N/A"} />
          <InfoField
            label="Academic Level"
            value={fromSnakeCase(data?.memberType) ?? "N/A"}
          />
          <InfoField
            label="Degree/Diploma"
            value={fromSnakeCase(data?.program) ?? "N/A"}
          />
          <InfoField
            label="Specialization"
            value={fromSnakeCase(data?.specialization) ?? "N/A"}
          />
          <InfoField label="Batch" value={data?.batch ?? "N/A"} />
        </div>
      </div>
    </div>
  );
};
export default AcademicInformation;
