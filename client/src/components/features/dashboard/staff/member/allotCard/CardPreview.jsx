import { CreditCard } from "lucide-react";
import React from "react";

const CardPreview = ({ data = {} }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Card Preview
      </h3>

      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-white/80 text-sm font-medium">
              SBSSU LIBRARY CARD
            </div>
            <CreditCard className="w-8 h-8 text-white/60" />
          </div>

          <div className="mb-4">
            <div className="text-white font-mono text-lg tracking-wider">
              {data.cardNumber || "CRD •• ••• ••"}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-white/60 text-xs">CARDHOLDER</div>
              <div className="text-white font-semibold">
                {data?.fullName?.toUpperCase()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-xs">VALID THRU</div>
              <div className="text-white font-semibold">
                {data.expiryDate
                  ? new Date(data.expiryDate).toLocaleDateString("en-US", {
                      month: "2-digit",
                      year: "2-digit",
                    })
                  : "MM/YY"}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex justify-between text-xs text-white/80">
              <span>{data.cardType}</span>
              <span>{data.department}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
