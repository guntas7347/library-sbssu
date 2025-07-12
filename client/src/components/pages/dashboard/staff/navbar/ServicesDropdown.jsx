import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ServicesDropdown = () => {
  const servicesRef = useRef(null);

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    setOpenDropdown((prev) => (prev === menuName ? null : menuName));
  };

  useEffect(() => {
    const handleClose = (event) => {
      setTimeout(() => {
        const clickedInServices = servicesRef.current?.contains(event.target);
        if (openDropdown && !clickedInServices) {
          setOpenDropdown(null);
        }
      }, 0);
    };

    document.addEventListener("click", handleClose);
    return () => document.removeEventListener("click", handleClose);
  }, [openDropdown]);

  return (
    <div ref={servicesRef}>
      <button
        id="mega-menu-dropdown-button"
        className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
        onClick={() => toggleDropdown("services")}
      >
        Services
        <svg
          className={`w-2.5 h-2.5 ms-3 ${
            openDropdown === "services" && "rotate-180"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {openDropdown === "services" && (
        <div className="absolute z-10 grid w-auto grid-cols-2 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-700">
          <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
            <ul
              className="space-y-4"
              aria-labelledby="mega-menu-dropdown-button"
            >
              <li>
                <Link
                  to="/staff/dashboard/issue-book"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Issue Book
                </Link>
              </li>
              <li>
                <Link
                  to="/staff/dashboard/return-book"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Return Book
                </Link>
              </li>
              <li>
                <Link
                  to="/staff/dashboard/issues"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Search Issues
                </Link>
              </li>
              <li>
                <Link
                  to="/staff/dashboard/returns"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Search Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/staff/dashboard/transactions"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Transactions
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/staff/dashboard/members"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Members
                </Link>
              </li>
              <li>
                <Link
                  to="/staff/dashboard/books"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/staff/dashboard/applications"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Applications
                </Link>
              </li>
              <li>
                <Link
                  to="/staff/dashboard/staff"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Staff
                </Link>
              </li>
              <li>
                <Link
                  to="/staff/dashboard/sessions"
                  className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  Sessions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesDropdown;
