import { CreditCard } from "lucide-react";
import React from "react";
import { fromSnakeCase, imagePathUrl } from "../../../../../../utils/functions";
import InfoField from "../../../../../forms/infoField/InfoField-2";

const LibraryCard = ({ data = { libraryCards: [] } }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "green";
      case "expired":
        return "red";
      case "issued":
        return "yellow";
      case "blocked":
        return "gray";
      default:
        return "gray";
    }
  };

  return (
    <>
      {data.libraryCards.map((card) => {
        return (
          <div
            key={card.id}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div
              className={`bg-${getStatusColor(card.status)}-500 p-6 text-white`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={imagePathUrl(data.photo)}
                    alt={data.fullName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{data.fullName}</h3>
                    <p className="text-white/80 text-sm">{data.membershipId}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}
                >
                  {card.status.toUpperCase()}
                </span>
              </div>

              {/* Card Visual */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white/80 text-xs">
                    SBSSU LIBRARY CARD
                  </div>
                  <CreditCard className="w-6 h-6 text-white/60" />
                </div>
                <div className="text-white font-mono text-lg tracking-wider mb-2">
                  {card.cardNumber?.replace(/-/g, " ")}
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white/60 text-xs">VALID THRU</div>
                    <div className="text-white text-sm font-medium">
                      {new Date(card.expiry).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/60 text-xs">TYPE</div>
                    <div className="text-white text-sm font-medium">
                      {fromSnakeCase(card.type)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Details */}
            <div className="p-6">
              <div className="space-y-4">
                <InfoField
                  label="Issue Date"
                  value={new Date(card.createdAt).toDateString()}
                />
                <InfoField label="Issued By" value={card.staff.fullName} />
                <InfoField
                  label="Issue Mode"
                  value={card.autoAlloted ? "Automatic" : "Manual"}
                />
                {card.finesOutstanding > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Outstanding Fines
                    </span>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      ${card.finesOutstanding}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Last Activity
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(card.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* <div className="mt-6 flex space-x-3">
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/70 transition-all duration-200">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">View Details</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all duration-200">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download</span>
                </button>
              </div> */}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LibraryCard;
