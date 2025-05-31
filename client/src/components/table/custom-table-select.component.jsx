import { useEffect, useState } from "react";
import { BadgeCheckSVG, CloseCircleSVG } from "../svg/svg-icons";

const CustomTableSelect = ({
  tableName,
  rows,
  columns,
  onSelect,
  indexToSelect,
  imageUrl = null,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const [selectedValue, setSelectedValue] = useState([null]);

  const handleRowClick = (index, row) => {
    if (selectedRowIndex === index) {
      setSelectedRowIndex(null);
    } else {
      setSelectedRowIndex(index);
    }

    setSelectedValue(row[indexToSelect]);
  };

  useEffect(() => {
    onSelect(tableName, selectedValue, isChecked);
  }, [isChecked, selectedValue, selectedRowIndex]);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
              <th className="px-6 py-3">Checked</th>
              {columns.map((column, index) => {
                return (
                  <th key={index} className="px-6 py-3">
                    {column}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return (
                <tr
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  key={index}
                >
                  <td className="px-6 py-4">
                    <input
                      className="size-5 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      type="checkbox"
                      onChange={(e) => {
                        handleRowClick(index, row);
                        setIsChecked(e.target.checked);
                      }}
                      checked={selectedRowIndex === index}
                    />
                  </td>
                  {row.map((td, index) => {
                    if (td === "AVAILABLE")
                      return (
                        <td key={index} className="px-6 py-4">
                          <span className="flex gap-2">
                            {td} <BadgeCheckSVG />
                          </span>
                        </td>
                      );
                    if (
                      [
                        "ISSUED",
                        "INACTIVE",
                        "REVOKED",
                        "EXPIRED",
                        "ARCHIVED",
                        "CLEARED",
                      ].includes(td)
                    )
                      return (
                        <td key={index} className="px-6 py-4">
                          <span className="flex gap-2">
                            {td} <CloseCircleSVG />
                          </span>
                        </td>
                      );

                    return (
                      <td key={index} className="px-6 py-4">
                        {td}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {imageUrl && (
              <tr>
                <td className="text-left w-96 px-6 py-3">Image</td>
                <td>
                  <img
                    className="w-52 h-52"
                    crossOrigin="anonymous"
                    src={imageUrl}
                    alt="image"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CustomTableSelect;
