import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import TablePagination from "../pagination/tablePagination";

const Table = ({ data = [], architecture = [] }) => {
  return (
    <>
      <div className="space-y-6">
        <div className="bg-white flex flex-col dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {architecture.map((column, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                  >
                    {architecture.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {column.render ? (
                          column.render(item)
                        ) : (
                          <div className="text-sm text-gray-900 dark:text-white">
                            {item[column.key]}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="">
            <TablePagination
              totalPages={1}
              currentPage={1}
              setPage={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
