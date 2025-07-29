import React from "react";
import { imagePathUrl } from "../../../../../../utils/functions";

const MemberDetails = ({ member }) => {
  // ✅ SAFE: A top-level guard clause is the best protection.
  if (!member) return null;

  return (
    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
      <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">
        Member Details
      </h4>
      <div className="flex items-center space-x-4">
        <img
          src={imagePathUrl(member?.photo)} // ✅ SAFE
          alt={member?.fullName ?? "Member Photo"} // ✅ SAFE
          className="w-12 h-12 hover:size-96 hover:absolute transition-all rounded-full object-cover border-2 border-green-200 dark:border-green-600"
        />
        <div>
          <h5 className="font-semibold text-green-900 dark:text-green-100">
            {member?.fullName ?? "Member Name N/A"} {/* ✅ SAFE */}
          </h5>
          <p className="text-sm text-green-700 dark:text-green-300">
            {member?.program ?? "N/A"} {member?.specialization ?? ""}{" "}
            {/* ✅ SAFE */}
          </p>
          <p className="text-xs text-green-600 dark:text-green-400">
            {member?.membershipId ?? "N/A"} • Card:{" "}
            {member?.cardNumber ?? "N/A"} {/* ✅ SAFE */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
