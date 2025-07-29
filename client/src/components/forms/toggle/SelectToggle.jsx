import React from "react";
import Toggle from "./Toggle";

const SelectToggle = ({
  label = "",
  sub = "",
  onToggle,
  defaultToggle = false,
}) => {
  return (
    <>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <h3 className="font-medium text-gray-900">{label}</h3>
          <p className="text-sm text-gray-600">{sub}</p>
        </div>
        <Toggle onToggle={onToggle} defaultToggle={defaultToggle} />
      </div>
    </>
  );
};

export default SelectToggle;
