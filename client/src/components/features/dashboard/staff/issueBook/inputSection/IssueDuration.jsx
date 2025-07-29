import { Calendar } from "lucide-react";
import RadioCard from "../../../../../forms/radio/RadioCard";
import Card from "../../../../../cards/Card";
import { useEffect, useState } from "react";
import server from "../../../../../../services/server.api";

const IssueDuration = ({ onSelect = () => {} }) => {
  // State to hold the final options formatted for the RadioCard component
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Asynchronous function to fetch and then format the settings
    const fetchAndFormatOptions = async () => {
      try {
        // 1. Fetch the setting, which is an array of strings (e.g., ["14", "28", "180"])
        const res = await server.settings.fetchSetting("ISSUE-DURATION");
        const daysArray = res.data.value || []; // Fallback to an empty array to prevent errors

        // 2. Transform the array of strings into the required object format
        const formattedOptions = daysArray.map((day) => ({
          label: `${day} Days`,
          value: parseInt(day, 10), // Convert the string value to a number
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Failed to fetch issue duration settings:", error);
        setOptions([]); // Set to empty on error to avoid a crash
      }
    };

    fetchAndFormatOptions();
  }, []); // <-- IMPORTANT: Empty dependency array ensures this effect runs only once

  return (
    <>
      <Card
        label="Issue Duration"
        svg={
          <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        }
      >
        <RadioCard
          // 3. Pass the correctly formatted options to the child component
          options={options}
          onChange={(e, option) => onSelect(option.value)}
        />
      </Card>
    </>
  );
};

export default IssueDuration;
