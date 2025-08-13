interface InfoFieldProps {
  label: string;
  value?: React.ReactNode;
  className?: string;
  renderValue?: () => React.ReactNode;
}

const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  className = "",
  renderValue,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 print:text-black mb-1">
        {label}
      </label>
      {renderValue ? (
        renderValue()
      ) : (
        <p
          className={`text-gray-900 dark:text-white print:text-black font-medium ${className}`}
        >
          {value || ""}
        </p>
      )}
    </div>
  );
};

export default InfoField;
