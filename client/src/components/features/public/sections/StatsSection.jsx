import React from "react";

const StatsSection = () => {
  return (
    <>
      {" "}
      <section className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 dark:from-blue-800/10 dark:to-purple-800/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                Books & Resources
              </div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                5K+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                Digital Resources
              </div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                200+
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                Study Seats
              </div>
            </div>
            <div className="group">
              <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                Digital Access
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;
