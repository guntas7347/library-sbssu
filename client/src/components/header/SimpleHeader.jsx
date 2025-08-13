const SimpleHeader = ({ title = "", sub = "" }) => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-50">{sub} </p>
      </div>
    </>
  );
};

export default SimpleHeader;
