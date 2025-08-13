import { CheckCircle } from "lucide-react";

import RadioCard from "../../../../../forms/radio/RadioCard";
import Card from "../../../../../cards/Card";

const IssueCondition = ({ onSelect = () => {} }) => {
  const conditionOptions = [
    {
      value: "new",
      label: "New",
      description: "No wear, Excellent condition",
    },
    {
      value: "good",
      label: "Good",
      description: "No damage, normal wear",
    },
    {
      value: "fair",
      label: "Fair",
      description: "Minor wear, still usable",
    },
    {
      value: "damaged",
      label: "Damaged",
      description: "Significant damage, needs repair",
    },
  ];
  return (
    <>
      <Card
        label="Book Condition"
        svg={
          <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        }
      >
        <RadioCard
          options={conditionOptions}
          onChange={(e, option) => onSelect(option.value)}
        />
      </Card>
    </>
  );
};

export default IssueCondition;

{
  /* <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
          Book Condition
        </h3>
        <div className="space-y-3">
          {conditionOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200"
            >
              <input
                type="radio"
                name="bookCondition"
                value={option.value}
                // checked={returnCondition === option.value}
                onChange={onChange}
                className="text-amber-600 focus:ring-amber-500 mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {option.label}
                  </span>
                  {option.fine > 0 && (
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      +${option.fine}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </> */
}
