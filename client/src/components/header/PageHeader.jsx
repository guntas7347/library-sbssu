import { Package } from "lucide-react";

const PageHeader = ({
  title = "",
  sub = "",
  svg: SVG = Package,
  colorClass = "bg-black",
  children,
}) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-1">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 ${colorClass} text-white rounded-xl flex items-center justify-center`}
                >
                  {<SVG />}
                </div>
                <div>
                  <h1
                    className={`text-xl font-bold ${colorClass.replace(
                      "bg-",
                      "text-"
                    )}`}
                  >
                    {title}
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {sub}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
