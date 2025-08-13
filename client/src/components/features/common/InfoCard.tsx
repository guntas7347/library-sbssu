type InfoFieldType = {
  label: string;
  value?: string | number | null;
  isCapitalized?: boolean;
};

type InfoCardProps = {
  title: string;
  data: InfoFieldType[];
  svg?: React.ReactNode;
};

const InfoCard = ({ title, svg, data }: InfoCardProps) => {
  if (!data) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border p-8">
      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="w-6 h-6 mr-3 text-purple-600">{svg}</span>
        {title}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.map(({ label, value, isCapitalized }, idx) => (
          <div key={idx}>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {label}
            </p>
            <p
              className={`text-base font-semibold ${
                isCapitalized ? "capitalize" : ""
              } text-gray-900 dark:text-white`}
            >
              {value ?? "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
