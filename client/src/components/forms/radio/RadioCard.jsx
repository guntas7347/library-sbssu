import { useState } from "react";

const RadioCard = ({ options = [], onChange = () => {} }) => {
  const [selected, setSelected] = useState();

  return (
    <>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200"
          >
            <input
              type="radio"
              name={option.name}
              value={option.value}
              checked={selected == option.value}
              onChange={(e) => {
                setSelected(e.target.value);
                onChange(e, option);
              }}
              className="text-amber-600 focus:ring-amber-500 mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  {option.label}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default RadioCard;
