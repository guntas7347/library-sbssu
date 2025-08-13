import React, { InputHTMLAttributes } from "react";
import Toggle from "./Toggle";

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onToggle"> {
  onToggle?: (checked: boolean) => void;
}

interface SelectToggleProps extends Omit<ToggleProps, "onToggle"> {
  label?: string;
  sub?: string;
  onToggle: (checked: boolean) => void;
}

const SelectToggle: React.FC<SelectToggleProps> = ({
  label = "",
  sub = "",
  onToggle,
  ...toggleProps
}) => {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div>
        <h3 className="font-medium text-gray-900">{label}</h3>
        <p className="text-sm text-gray-600">{sub}</p>
      </div>
      <Toggle onToggle={onToggle} {...toggleProps} />
    </div>
  );
};

export default SelectToggle;
