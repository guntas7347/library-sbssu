import React from "react";
import useToggle from "../../components/hooks/use-toggle";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggler from "../../components/darkmode.toggle";

const NavbarPublic = () => {
  const { getToggle, toggle } = useToggle();
  const location = useLocation();
  const active =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-2xl shadow-gray-300/50 dark:shadow-black/50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/sbssu-logo.png" className="h-8" alt="SBSSU Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Library SBSSU
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => toggle()}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${!getToggle && "hidden"} w-full md:block md:w-auto `}
          >
            <ul className="font-medium flex justify-center items-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className={`${
                    active === ""
                      ? "c-public-nav-li-selected"
                      : "c-public-nav-li"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/join"
                  className={`${
                    active === "join"
                      ? "c-public-nav-li-selected"
                      : "c-public-nav-li"
                  }`}
                >
                  Join
                </Link>
              </li>
              <li>
                <Link
                  to="/join/applied"
                  className={`${
                    active === "applied"
                      ? "c-public-nav-li-selected"
                      : "c-public-nav-li"
                  }`}
                >
                  View my application
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className={`${
                    active === "contact"
                      ? "c-public-nav-li-selected"
                      : "c-public-nav-li"
                  }`}
                >
                  Contact
                </Link>
              </li>
              <li className="">
                <DarkModeToggler />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarPublic;
