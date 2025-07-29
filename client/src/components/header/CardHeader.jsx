import React from "react";

const CardHeader = ({ svg: Svg, title = "", svgClass = "" }) => {
  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 ${svgClass} rounded-lg`}>
          <Svg className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      </div>
    </>
  );
};

export default CardHeader;
