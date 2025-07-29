import React from "react";
import InfoField from "../../../../../forms/infoField/InfoField ";
import { Book } from "lucide-react";

const BookInformation = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="p-8">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Book className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
          Book Information
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoField label="ISBN" value={data?.isbn ?? "N/A"} />
          <InfoField
            label="Publisher"
            value={data?.placeAndPublishers ?? "N/A"}
          />
          <InfoField
            label="Published Year"
            value={data?.publicationYear ?? "N/A"}
          />
          <InfoField label="Edition" value={data?.edition ?? "N/A"} />
          <InfoField label="Pages" value={data?.pages ?? "N/A"} />
          <InfoField label="Location" value={data?.location ?? "N/A"} />
          <InfoField label="Source" value={data?.source ?? "N/A"} />
          <InfoField
            label="Cost"
            value={data?.cost ? `₹${data.cost}` : "N/A"}
          />
        </div>

        <div className="mt-6">
          <InfoField
            label="Total Copies"
            value={data?.accessions?.length ?? 0}
          />
          <InfoField
            label="Description"
            value={data?.description ?? "No description available."}
          />
        </div>
      </div>
    </div>
  );
};

export default BookInformation;
