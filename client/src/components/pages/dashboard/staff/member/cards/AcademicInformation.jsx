import { GraduationCap } from "lucide-react";
import React from "react";
import InfoField from "../../../../../forms/infoField/InfoField ";
import { memberTypeLabels } from "../../../../../../utils/selectLabels";

const AcademicInformation = ({ data }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <GraduationCap className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            Academic Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoField label="Roll Number" value={data?.rollNumber || ""} />
            <InfoField
              label="Academic Level"
              value={memberTypeLabels[data?.memberType] || ""}
            />
            <InfoField label="Degree/Diploma" value={data?.program || ""} />
            <InfoField
              label="Specialization"
              value={data?.specialization || ""}
            />{" "}
            <InfoField label="Batch" value={data?.batch || ""} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademicInformation;
