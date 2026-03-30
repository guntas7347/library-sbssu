import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
// Import your server api
// import server from "../../../../../../services/server.api";

// --- Date Helpers ---
// Generates an ISO string pinned to IST (UTC+05:30) at the end of the day
const generateIstIsoString = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T23:59:59+05:30`;
};

// Formats a date for pretty UI display (e.g., "14 Oct 2026")
const formatUIDate = (dateObj) => {
  return dateObj.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const IssueDuration = ({
  onSelect,
}: {
  onSelect: (duration: string) => void;
}) => {
  const [predefinedDays, setPredefinedDays] = useState([]);
  const [selectionMode, setSelectionMode] = useState("predefined"); // 'predefined' | 'custom'
  const [selectedDayVal, setSelectedDayVal] = useState(null);
  const [customDateVal, setCustomDateVal] = useState("");

  // Get today's date safely rounded to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Min date for custom date picker (YYYY-MM-DD)
  const minDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Mocking the server response for standalone testing.
        // Replace this with your actual call:
        // const res = await server.settings.fetchSetting("ISSUE-DURATION");
        // const daysArray = res.data.value || [];
        const daysArray = ["7", "14", "30"];

        const numericDays = daysArray.map((d) => parseInt(d, 10));
        setPredefinedDays(numericDays);

        // Auto-select the first option by default
        if (numericDays.length > 0) {
          handlePredefinedSelect(numericDays[0]);
        }
      } catch (error) {
        console.error("Failed to fetch issue duration settings:", error);
      }
    };

    fetchSettings();
  }, []);

  // Handler for predefined day selection
  const handlePredefinedSelect = (days) => {
    setSelectionMode("predefined");
    setSelectedDayVal(days);

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + days);

    onSelect(generateIstIsoString(targetDate));
  };

  // Handler for custom date selection
  const handleCustomDateSelect = (e) => {
    const rawDate = e.target.value; // format: YYYY-MM-DD
    setCustomDateVal(rawDate);

    if (rawDate) {
      // Create the IST ISO string directly from the YYYY-MM-DD input
      const istIso = `${rawDate}T23:59:59+05:30`;
      onSelect(istIso);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 max-w-md">
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center border-b border-gray-100 dark:border-gray-700 pb-4">
        <Calendar className="w-6 h-6 mr-3 text-amber-600 dark:text-amber-400" />
        Issue Duration
      </h3>

      <div className="space-y-3">
        {/* Predefined Options */}
        {predefinedDays.map((days) => {
          const returnDate = new Date(today);
          returnDate.setDate(today.getDate() + days);

          return (
            <label
              key={days}
              className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                selectionMode === "predefined" && selectedDayVal === days
                  ? "bg-amber-50 dark:bg-amber-900/20 border-amber-500 shadow-sm"
                  : "bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-amber-300 dark:border-gray-700"
              }`}
            >
              <input
                type="radio"
                name="issue_duration"
                value={days}
                checked={
                  selectionMode === "predefined" && selectedDayVal === days
                }
                onChange={() => handlePredefinedSelect(days)}
                className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
              />
              <div className="flex-1">
                <div className="font-bold text-gray-900 dark:text-white">
                  {days} Days
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                  Return by:{" "}
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">
                    {formatUIDate(returnDate)}
                  </span>
                </div>
              </div>
            </label>
          );
        })}

        {/* Custom Date Option */}
        <label
          className={`flex flex-col space-y-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
            selectionMode === "custom"
              ? "bg-amber-50 dark:bg-amber-900/20 border-amber-500 shadow-sm"
              : "bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-amber-300 dark:border-gray-700"
          }`}
        >
          <div className="flex items-center space-x-4">
            <input
              type="radio"
              name="issue_duration"
              value="custom"
              checked={selectionMode === "custom"}
              onChange={() => setSelectionMode("custom")}
              className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
            />
            <div className="font-bold text-gray-900 dark:text-white flex-1">
              Custom Return Date
            </div>
          </div>

          {/* Render Date Input only if Custom is selected */}
          {selectionMode === "custom" && (
            <div className="pl-8">
              <input
                type="date"
                min={minDateStr}
                value={customDateVal}
                onChange={handleCustomDateSelect}
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none transition-all cursor-text"
              />
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default IssueDuration;
