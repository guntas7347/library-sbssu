const Card = ({ children, label, svg }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          {svg}
          <span className="ml-2">{label}</span>
        </h3>

        {children}
      </div>
    </>
  );
};

export default Card;
