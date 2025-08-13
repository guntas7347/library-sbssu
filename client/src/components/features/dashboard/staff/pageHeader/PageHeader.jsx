const PageHeader = ({
  title = "Dashboard",
  subTitle = "Overview of library operations and statistics",
}) => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {title}{" "}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{subTitle}</p>
      </div>
    </>
  );
};

export default PageHeader;
