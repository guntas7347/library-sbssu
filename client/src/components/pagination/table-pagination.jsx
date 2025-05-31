import React, { useEffect } from "react";
import useInput from "../hooks/use-input";

const TablePagination = ({
  totalPages = 1,
  currentPage = 1,
  setPage,
  rows = 10, // rows per page
}) => {
  const { formField, handleChange: hc } = useInput({ currentPage });

  const handlePrevious = () => {
    if (currentPage - 1 > 0) setPage(+currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setPage(+currentPage + 1);
  };
  const handleJump = (e) => {
    if (e.key !== "Enter") return;
    if (currentPage === formField.value) return;
    setPage(+formField.value);
  };

  useEffect(() => {
    hc({ target: { name: "currentPage", value: currentPage } });
  }, [currentPage]);

  const handleChange = (e) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;
    if (value > totalPages)
      hc({ target: { name: "currentPage", value: totalPages } });
    else hc({ target: { name: "currentPage", value: value } });
  };

  return (
    <div>
      <nav
        className="flex p-2 items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {currentPage}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalPages}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={handlePrevious}
              className="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>

          <li>
            <input
              className="flex text-center w-20 items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              type="text"
              value={formField.value}
              onKeyDown={handleJump}
              onChange={handleChange}
              pattern="[0-9]*"
              onClick={(e) => e.target.select()}
            />
          </li>
          <li>
            <button
              onClick={handleNext}
              className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TablePagination;
