import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const CounterField = ({
  label = "",
  sub = "",
  name = label,
  defaultValue = 0,
  minVal = 0,
  maxValue = 10,
  onChange,
}) => {
  const [count, setCount] = useState(defaultValue);
  const handleIncrement = () => {
    if (count < maxValue) {
      setCount((p) => p + 1);
      onChange(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > minVal) {
      setCount((p) => p - 1);
      onChange(count - 1);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value <= maxValue) {
        setCount(+e.target.value);
        onChange(+e.target.value);
      } else {
        setCount(+maxValue);
        onChange(+maxValue);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            {label}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-200">{sub}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            className="w-12 text-center font-medium"
            name={name}
            value={count}
            onChange={handleChange}
          />
          <button
            onClick={handleIncrement}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CounterField;
