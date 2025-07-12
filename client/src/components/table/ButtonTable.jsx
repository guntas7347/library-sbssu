import React from "react";
import TablePagination from "../pagination/tablePagination";

const ButtonTable = ({
  cols,
  rows,
  onClick,
  indexToSelect = 0,
  totalPages = 1,
  currentPage = 1,
  setPage,
  actions,
  readOnly = false,
  dateIdx = false,
}) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {cols.map((th, idx) => {
                return (
                  <th key={idx} scope="col" className="px-6 py-3">
                    {th}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((tr, rIdx) => {
              return (
                <tr
                  key={rIdx}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  {tr.map((td, cIdx) => {
                    if (cIdx === 0) return;
                    if (dateIdx)
                      if (cIdx === dateIdx)
                        return (
                          <td key={cIdx} className="px-6 py-4">
                            {new Date(td).toLocaleString()}
                          </td>
                        );
                    return (
                      <td key={cIdx} className="px-6 py-4">
                        {td}
                      </td>
                    );
                  })}
                  {!readOnly && (
                    <td key="actions" className="px-6 py-4 flex gap-4">
                      {actions.map((action, aIdx) => {
                        return (
                          <>
                            <span
                              key={aIdx}
                              className="font-medium capitalize cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                              onClick={() => onClick(action, tr[indexToSelect])}
                            >
                              {action}
                            </span>
                          </>
                        );
                      })}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <TablePagination
          totalPages={totalPages}
          currentPage={currentPage}
          setPage={setPage}
        />{" "}
      </div>
    </div>
  );
};

export default ButtonTable;
