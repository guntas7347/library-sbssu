import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const active =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <div className="relative h-full">
      <aside className="absolute -top-5 -left-10 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/admin/dashboard/settings/programs"
                className={`c-sidebar-li ${
                  active === "programs" && "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.6427 21h14M16.2928 9c.8398.95515 1.3499 2.213 1.3499 3.5912 0 2.9872-2.3962 5.4088-5.3521 5.4088-1.9895 0-3.72545-1.097-4.6479-2.7251m-2-.2749h6m.4369-4.4369L10.6427 12m5.8092-5.76698 2.1554-2.15534M17.5296 3l2.1553 2.15534M10.6427 18v3m4-3v3m.7315-15.84464-4.3107 4.31068 2.1554 2.15536 4.3107-4.3107-2.1554-2.15534Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Programs</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/settings/issue"
                className={`c-sidebar-li ${
                  active === "issue" && "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 6c0-1.65685 1.3431-3 3-3s3 1.34315 3 3-1.3431 3-3 3-3-1.34315-3-3Zm2 3.62992c-.1263-.04413-.25-.08799-.3721-.13131-1.33928-.47482-2.49256-.88372-4.77995-.8482C4.84875 8.66593 4 9.46413 4 10.5v7.2884c0 1.0878.91948 1.8747 1.92888 1.8616 1.283-.0168 2.04625.1322 2.79671.3587.29285.0883.57733.1863.90372.2987l.00249.0008c.11983.0413.24534.0845.379.1299.2989.1015.6242.2088.9892.3185V9.62992Zm2-.00374V20.7551c.5531-.1678 1.0379-.3374 1.4545-.4832.2956-.1034.5575-.1951.7846-.2653.7257-.2245 1.4655-.3734 2.7479-.3566.5019.0065.9806-.1791 1.3407-.4788.3618-.3011.6723-.781.6723-1.3828V10.5c0-.58114-.2923-1.05022-.6377-1.3503-.3441-.29904-.8047-.49168-1.2944-.49929-2.2667-.0352-3.386.36906-4.6847.83812-.1256.04539-.253.09138-.3832.13765Z" />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Issue</span>
              </Link>
            </li>{" "}
            <li>
              <Link
                to="/admin/dashboard/settings/return"
                className={`c-sidebar-li ${
                  active === "return" && "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Return</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
