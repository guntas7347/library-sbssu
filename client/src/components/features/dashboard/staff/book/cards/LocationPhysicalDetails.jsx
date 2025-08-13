import Input from "../../../../../forms/input/Input-2";
import { MapPin } from "lucide-react";

const LocationPhysicalDetails = ({ onChange = () => {} }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
          Location & Physical Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Location"
            name="location"
            onChange={onChange}
            placeholder="e.g., CS-A-101"
          />
          <Input
            label="Remark"
            name="remark"
            onChange={onChange}
            placeholder="Enter remark"
          />
        </div>
      </div>
    </>
  );
};

export default LocationPhysicalDetails;
